<?php
defined('BASEPATH') OR exit('No direct script access allowed');
define("timezone", date_default_timezone_set('Asia/Jakarta'));
define("USERNAME_DB", "postgres");
define("PASSWD_DB", "postgres");
//define("PASSWD_DB", "Ui7AiUzsFm7k4JwRTDcF");
define("NAME_DB", "slumdb");
define("TEMP_FILE_SHP", $_SERVER['DOCUMENT_ROOT']."/slum/assets/shp/");
define("PATH_POSTGIS", "C:/Program Files/PostgreSQL/10/bin/");
// define("PATH_POSTGIS", "/usr/bin/");
define("PATH_SHP2PGSQL", "C:/Program Files/Postgresql/10/bin/shp2pgsql.exe");
define("PATH_PSQL", "C:/Program Files/PostgreSQL/10/bin/psql.exe");
// define("PATH_SHP2PGSQL", "/usr/bin/shp2pgsql");
// define("PATH_PSQL", "/usr/bin/psql");
define("HOST", "localhost");
// define("HOST", "partisipatori.geo-portal.id");

class MY_Controller extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper('captcha');
		$this->load->helper('string');
        $this->load->helper('cookie');
        $this->load->library('encryption');
    }

    public function get_path_temp_file_shp()
	{
        return constant("TEMP_FILE_SHP");
    }

    public function get_path_postgis()
	{
        return constant("PATH_POSTGIS");
    }

    public function is_loggedin()
    {
		$bool = false;
        if($this->session->userdata('logged_in')){
			$bool = true;
        }

		return $bool;
    }

    public function set_cookies($name, $value)
    {
        $exp = time()+60*60*2;

		setcookie($name, $value, $exp, '/');
    }

    public function get_cookies($name)
    {
        return get_cookie($name);
    }

    public function set_remember_me($id, $key)
    {
        $this->set_cookies('idx', $id);
        $this->set_cookies('keys', $key);
    }

    public function validate_cookie()
    {
        $ret = false;
        $idx = $this->get_cookies('idx');
        $keys = $this->get_cookies('keys');
        $data = $this->m_login->get_data($idx);
        if($data->num_rows() > 0) {
            $row = $data->row();
            $key = $row->password;
            if($keys === $key) {
                $data_login = $this->m_login->get_login($row->username);
                if($data_login->num_rows() > 0){
                    $row_login = $data_login->row();
                    $arraydata = array(
                        'logged_in'  => true
                    );
                    
                    $this->session->set_userdata($arraydata);
                }

                $ret = true;
            }
        }

        return $ret;
    }

    public function encrypted_hash($username, $password)
    {
        $salt = "ae31ce";
        $ret = hash("sha512", $username . $password . $salt);

        return $ret;
    }

    public function refresh_captcha() 
	{
        $img_path = FCPATH . 'assets/captcha_images/';
        $config = array(
			'word'          => random_string('alnum', 5),
            'img_path'      => $img_path,
            'img_url'       => base_url().'assets/captcha_images/',
            'font_path'     => FCPATH . 'system/fonts/texb.ttf',
            'img_width'     => 170,
            'img_height'    => 55,
            'expiration'    => 7200,
            'word_length'   => 6,
            'font_size'     => 25,
			'img_id'        => 'Imageid',
			'pool'          => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'colors'        => array(
                'background' => array(255, 255, 255),
                'border' => array(0, 0, 0),
				'text' => array(0, 0, 0),
				'grid' => array(255, 255, 255)
            )
        );
        
		$captcha = create_captcha($config);
        if($this->session->userdata('captcha_code')) {
			$filename = $img_path . $this->session->userdata('captcha_filename');
			if(file_exists($filename)) {
				unlink($filename);
			}
			$this->session->unset_userdata('captcha_code');
		}
		
        $this->session->set_userdata('captcha_code', $captcha['word']);
		$this->session->set_userdata('captcha_filename', $captcha['filename']);

        return $captcha['image'];
    }

    public function get_path_temp_file()
	{
        return constant("TEMP_FILE");
    }

    public function remove_session()
    {
		return $this->session->sess_destroy();
    }

    public function firt_each_word_capitalize($str)
    {
        return ucwords(strtolower($str));
    }

    public function word_capitalize($str)
    {
        return strtoupper($str);
    }

    public function word_lower($str)
    {
        return strtolower($str);
    }
	
    public function get_timezone()
    {
        return constant("timezone");
    }

    public function set_format_number($val, $digit_number = 2, $delimeter1 = ',', $delimeter2 = '.')
    {
        return number_format($val, $digit_number, $delimeter1, $delimeter2);
    }

    public function string_replace($val, $search, $replace)
    {
        return str_replace($search, $replace, $val);
    }

    public function string_trap($val)
    {
        return $val.' ';
    }

    public function get_name_from_id($id, $table_name)
    {
        $nama = '';
        $param = $table_name.'?id='.$id;
		$data = $this->curl_opt($param);
        $str = json_decode($data, true);

        if($table_name == 'tipe_material') {
            $nama = $str['data']['material'];
        }else if($table_name == 'kondisi') {
            $nama = $str['data']['kondisi'];
        }

        return $nama == null ? '-' : $nama;
    }
    
    public function get_format_table_json($data)
    {
        $datatable = array_merge(['pagination' => [], 'sort' => [], 'query' => []], $_REQUEST);

        $filter = isset($datatable['query']['generalSearch']) && is_string($datatable['query']['generalSearch'])
            ? $datatable['query']['generalSearch'] : '';
        if ( ! empty($filter)) {
            $data = array_filter($data, function ($a) use ($filter) {
                return (boolean)preg_grep("/$filter/i", (array)$a);
            });
            unset($datatable['query']['generalSearch']);
        }

        $query = isset($datatable['query']) && is_array($datatable['query']) ? $datatable['query'] : null;
        if (is_array($query)) {
            $query = array_filter($query);
            foreach ($query as $key => $val) {
                $data = list_filter($data, [$key => $val]);
            }
        }

        $sort  = ! empty($datatable['sort']['sort']) ? $datatable['sort']['sort'] : 'asc';
        $field = ! empty($datatable['sort']['field']) ? $datatable['sort']['field'] : 'id';

        $meta    = [];
        $page    = ! empty($datatable['pagination']['page']) ? (int)$datatable['pagination']['page'] : 1;
        $perpage = ! empty($datatable['pagination']['perpage']) ? (int)$datatable['pagination']['perpage'] : -1;

        $pages = 1;
        $total = count($data);

        usort($data, function ($a, $b) use ($sort, $field) {
            if ( ! isset($a->$field) || ! isset($b->$field)) {
                return false;
            }

            if ($sort === 'asc') {
                return $a->$field > $b->$field ? true : false;
            }

            return $a->$field < $b->$field ? true : false;
        });

        if ($perpage > 0) {
            $pages  = ceil($total / $perpage);
            $page   = max($page, 1);
            $page   = min($page, $pages);
            $offset = ($page - 1) * $perpage;
            if ($offset < 0) {
                $offset = 0;
            }

            $data = array_slice($data, $offset, $perpage, true);
        }

        $meta = [
            'page'    => $page,
            'pages'   => $pages,
            'perpage' => $perpage,
            'total'   => $total,
        ];

        if (isset($datatable['requestIds']) && filter_var($datatable['requestIds'], FILTER_VALIDATE_BOOLEAN)) {
            $meta['rowIds'] = array_map(function ($row) {
                foreach($row as $first) break;
                return $first;
            }, $alldata);
        }

        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

        $result = [
            'meta' => $meta + [
                    'sort'  => $sort,
                    'field' => $field,
                ],
            'data' => $data,
        ];

        return json_encode($result, JSON_PRETTY_PRINT);
    }

    public function json_flip_flop($data, $as_array_assoc = FALSE)
	{
		return json_decode(json_encode($data), $as_array_assoc);
	}

    public function get_extension($full_path_filename)
    {
        $ext = pathinfo($full_path_filename, PATHINFO_EXTENSION);
        return $ext;
    }
    
    public function generate_shp($query, $filename)
    {
        $ret = '';
        $ext_shp = 'shp';
        $ext_zip = 'zip';
        $path_temp_shp = $this->get_path_temp_file_shp();
        $full_path_filename = $path_temp_shp.$filename;

        $command = $this->get_command_postgis($full_path_filename, $query);
        $res = $command;
        
	    if($res){
            if(file_exists($full_path_filename.'.'.$ext_shp)){
                $path = $path_temp_shp;

                $zip = new ZipArchive();
                $zip->open($full_path_filename.'.'.$ext_zip, ZipArchive::CREATE | ZipArchive::OVERWRITE);
                $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
                foreach ($files as $name => $file)
                {
                    if ($file->isDir()) {
                        flush();
                        continue;
                    }
                    
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($path));
                    $zip->addFile($filePath, $relativePath);
                }
                $zip->close();

                foreach ($files as $name => $file)
                {
                    if ($file->isDir()) {
                        flush();
                        continue;
                    }

                    if(file_exists($file->getRealPath())){
                        $ext = pathinfo($file->getRealPath(), PATHINFO_EXTENSION);
                        if($ext !== 'zip'){
                            @unlink($file->getRealPath());
                        }
                    }
                }
                
                $ret = true;
            }else{
                $ret = false;
            }
        }else{
            $ret = false;
        }

        return $ret;
    }

    public function delete_zip($filename)
    {
        $file = 'assets/shp/'.$filename.'.zip';
        if(file_exists($file)){
            @unlink($file);
        }
    }

    function delete_directory($dirname) {
        if (is_dir($dirname))
            $dir_handle = opendir($dirname);
        if (!$dir_handle)
            return false;

        while($file = readdir($dir_handle)) {
            if ($file != "." && $file != "..") {
                if (!is_dir($dirname."/".$file))
                    unlink($dirname."/".$file);
                else
                    delete_directory($dirname.'/'.$file);
            }
        }
        closedir($dir_handle);
        rmdir($dirname);
        return true;
    }

    public function shptopostgis($full_path_filename, $table)
    {
        $pass = constant("PASSWD_DB");
        $path_shp2pgsql = constant("PATH_SHP2PGSQL");
        $path_psql = constant("PATH_PSQL");
        $db_name = constant("NAME_DB");
        $host = constant("HOST");
        $db_user = constant("USERNAME_DB");

        $command = 'shp2pgsql.bat '.$pass.' "'.$path_shp2pgsql.'" "'.$full_path_filename.'" '.$table.' "'.$path_psql.'" '.$host.' '.$db_user.' '.$db_name;
        return shell_exec($command);
    }

    public function get_command_postgis($full_path_filename, $query)
    {
        $ext_shp = 'shp';
        $path_postgis = $this->get_path_postgis();
        
        $command = '"'.$path_postgis.'pgsql2shp'.'" ';
        $command .= '-u '.constant("USERNAME_DB").' -h localhost -P '.constant("PASSWD_DB").' -p 5432 -f "'.$full_path_filename.'.'.$ext_shp.'" '.constant("NAME_DB").' "'.$query.'"';

        return shell_exec($command);
    }
}