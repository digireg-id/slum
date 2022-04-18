<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Recap_data extends MY_Controller {
	public function __construct()
    {
        parent::__construct();
        $this->load->model('m_recap_data');
    }
	
	public function index()
	{
        if ($this->is_loggedin()) {
            $this->load->view('recap_data');
        }else{
            redirect(base_url().'login');
        }
	}

    public function get_list_data()
	{
        $data = array();
        $datas = $this->m_recap_data->get_list_data();
        
        if($datas->num_rows() > 0) {
            foreach($datas->result() as $item) {
                $row = array(
                    'num' => $item->num,
                    'id_respondent' => $item->id_respondent,
                    'respondent' => $item->respondent,
                    'datetime' => $item->datetime,
                    'total_submission' => $item->total_submission,
		            'actions' => $item->id_respondent
                );
    
                array_push($data, $row);
            }
        }

        $ret = $this->get_format_table_json($data);
        echo $ret;
	}

    public function delete_data()
	{
        $id_respondent = $this->security->xss_clean($this->input->post('id_respondent'));

        if(!empty($id_respondent)) {
            $data = $this->m_recap_data->delete_data($id_respondent);
        }

        if($data) {
            $status = true;
            $message = 'Your data has been deleted';
        } else {
            $status = false;
            $message = 'Data cannot be deleted';
        }

        $ret = array(
            'status' => $status,
            'message' => $message
        );

        echo json_encode($ret);
	}

    public function create_link($id, $filename)
    {
        $ret = '';
        $datas = $this->m_recap_data->get_data_by_id($id);
        
        if($datas->num_rows() > 0){
            $query = 'select * from v_respondent_submission_detail where id_respondent = ' . $id. ' order by id_respondent';
            $ret = $this->generate_shp($query, $filename);
        }

        echo $ret;
    }

    public function create_link_all($filename)
    {
        $ret = '';
        $datas = $this->m_recap_data->get_list_data();
        
        if($datas->num_rows() > 0){
            $query = 'select * from v_respondent_submission_detail order by id_respondent';
            $ret = $this->generate_shp($query, $filename);
        }

        echo $ret;
    }

    public function delete_file_zip($filename)
    {
        $this->delete_zip($filename);
    }
}