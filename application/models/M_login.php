<?php

class M_login extends CI_Model
{
    function get_login($username)
    {
        $this->db->select('id, username, password, created_date as tgl_buat');
        $this->db->from('t_users');
        $this->db->where('username', $username);
        $query = $this->db->get();
        
        return $query;
    }
	
	public function get_data($username, $password)
    {
		$res = '';
        $this->db->select("id, username, password, created_date as tgl_buat");
        $this->db->from('t_users');
        $this->db->where('username', $username);
		$this->db->where('password', hash("sha256", $password));
        $query = $this->db->get();
        
		$res = $query;
        return $res;
    }
}