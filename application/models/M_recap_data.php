<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_recap_data extends CI_Model {
    function __construct()
    {
        parent::__construct();
    }

    function get_list_data()
    {
        $this->db->select("num, id_respondent, respondent, datetime, total_submission");
        $this->db->from('public.v_recap');
        $this->db->order_by('num');
        $query = $this->db->get();
        
        return $query;
    }

    function get_data_by_id($num)
    {
        $this->db->select("num, id_respondent, respondent, datetime, total_submission");
        $this->db->from('public.v_recap');
        $this->db->where('id_respondent', $num);
        $this->db->order_by('num');
        $query = $this->db->get();
        
        return $query;
    }

    function delete_data($id_respondent) {
        $this->db->where('id', $id_respondent);
        $this->db->delete('public.t_respondent');

        $ret = ($this->db->affected_rows() > 0 ? true : false);
        return $ret;
    }
}