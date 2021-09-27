<?php

class M_dashboard extends CI_Model
{
    public function get_list_data()
    {
		$res = '';
        $this->db->select('id, label, jenis, objek, status, created_by, created_date, updated_by, updated_date');
        $this->db->from('t_layer_support');
		$this->db->order_by('id', 'asc');
        $query = $this->db->get();

        if($query->num_rows() > 0)
        {
            $res = $query->result();
        }
        
        return $res;
    }

    public function save_data($datas)
    {
        $id = 1;
        $idz = 1;
        $idq = 1;
        $sub = 1;
        $ret = false;
        date_default_timezone_set('Asia/Jakarta');

        if(count($datas) > 0) {
            $this->db->select('max(id) as maxid');
            $this->db->from('public.t_respondent');
            $query = $this->db->get();
            
            if($query->num_rows() > 0)
            {
                $id = $query->row()->maxid + 1;
            }
    
            $data = array(
                'id' => $id,
                'date' => date('Y-m-d H:i:s')
            );        
            
            $this->db->insert('public.t_respondent', $data);
            $retx = ($this->db->affected_rows() > 0 ? true : false);

            if($retx == true) {
                foreach($datas as $key=>$value) {
                    $id_respondent_detail = 1;
                    $this->db->select('max(id) as maxid');
                    $this->db->from('public.t_respondent_detail');
                    $queryx = $this->db->get();
                    
                    if($queryx->num_rows() > 0)
                    {
                        $id_respondent_detail = $queryx->row()->maxid + 1;
                    }

                    if($key !== 'submission') {
                        $datax = array(
                            'id' => $id_respondent_detail,
                            'id_respondent' => $id,
                            'description' => $key,
                            'answer' => $value
                        );
                        
                        $this->db->insert('public.t_respondent_detail', $datax);
                        $ret = ($this->db->affected_rows() > 0 ? true : false);
                    }
                }
            }

            $set_data = json_decode($datas['submission'], true);
            $wilayah = '';
            $peta = '';

            foreach($set_data as $itemz) {
                $this->db->select('max(id) as maxid');
                $this->db->from('public.t_submission');
                $queryq = $this->db->get();
                
                if($queryq->num_rows() > 0)
                {
                    $idq = $queryq->row()->maxid + 1;
                }

                $query = 'INSERT INTO public.t_submission VALUES('.$idq.','.$itemz['wilayah'].','.$id.',\''.date('Y-m-d H:i:s').'\',ST_GeomFromGeoJSON(\''.json_encode($itemz['peta']['geometry']).'\'),\'Submission '.$sub.'\')';
				$this->db->query($query);
                $retq = ($this->db->affected_rows() > 0 ? true : false);
                $sub++;

                foreach($itemz as $keyz=>$valuez) {
                    $this->db->select('max(id) as maxid');
                    $this->db->from('public.t_submission_detail');
                    $queryz = $this->db->get();
                    
                    if($queryz->num_rows() > 0)
                    {
                        $idz = $queryz->row()->maxid + 1;
                    }
            
                    if($keyz !== 'wilayah' && $keyz !== 'peta') {
                        $dataz = array(
                            'id' => $idz,
                            'id_submission' => $idq,
                            'description' => $keyz,
                            'answer' => $valuez
                        );        
                        
                        $this->db->insert('public.t_submission_detail', $dataz);
                        $retz = ($this->db->affected_rows() > 0 ? true : false);
                    }

                    if($keyz === 'wilayah') {
                        $wilayah = $valuez;
                    }

                    if($keyz === 'peta') {
                        $peta = $valuez;
                    }
                }
            }
        }

        return $retq;
    }
}