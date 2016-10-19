<?php

/* * 
 * 公共模型
 */

namespace Common\Model;
use Think\Model;

class BaseModel extends Model {

    Const STATUS_NORMAL = 1;
    Const STATUS_FORBIDDEN = 0;

    /**
     * 删除表
     */
    final public function drop_table($tablename) {
        $tablename = C("DB_PREFIX") . $tablename;
        return $this->query("DROP TABLE $tablename");
    }

    /**
     * 读取全部表名
     */
    final public function list_tables() {
        $tables = array();
        $data = $this->query("SHOW TABLES");
        foreach ($data as $k => $v) {
            foreach($v as $item) {
                $tables[] = $item;
            }
        }
        return $tables;
    }

    /**
     * 检查表是否存在 
     * $table 不带表前缀
     */
    final public function table_exists($table) {
        $tables = $this->list_tables();
        return in_array(C("DB_PREFIX") . $table, $tables) ? true : false;
    }

    /**
     * 获取表字段 
     * $table 不带表前缀
     */
    final public function get_fields($table) {
        $fields = array();
        $table = C("DB_PREFIX") . $table;
        $data = $this->query("SHOW COLUMNS FROM $table");
        foreach ($data as $v) {
            $fields[$v['Field']] = $v['Type'];
        }
        return $fields;
    }

    /**
     * 检查字段是否存在
     * $table 不带表前缀
     */
    final public function field_exists($table, $field) {
        $fields = $this->get_fields($table);
        return array_key_exists($field, $fields);
    }
    
    protected function _before_write(&$data) {
    	/* if(!isset($_SESSION['ADMIN_ID']) || (isset($_SESSION['ADMIN_ID'])&& $_SESSION['roleid']!=1)){
    		foreach ($data as $key=>$d){
    			//$data[$key]=hh($d);
    		}
    	} */
    	 
    }

    /**
     * 获取数据的总行数
     */
    public function count( $fieldName = null, $where = null, $value = null) {

        if (!$fieldName) {
            $fieldName = $this->getPk();
        }
        $data = (!is_null($where)) ?
            $this->field('count(' . $fieldName . ') as total_num')->where($where, $value)->find() :
            $this->field('count(' . $fieldName . ') as total_num')->find();

            return $data['total_num'];
    }
    /*获取查询总数*/
    public function getCount($condition){
        $result = $this->count(null,$condition);

        $this->showSql();

        return $result;
    }

    /**
     *获取查询总数
     * $order array()
     *
     */
    public function getAll($where, $value=null, $fields = null, $order = null,$limit=null) {
        //参数分析
        if (!$where) {
            return false;
        }
        //获取数据表名
        $this->getTableName();

        //分析查询的字段信息
        $this->field($fields);
        //处理查询的SQL语句
        $this->where($where, $value);
        //处理排序的SQL语句
        if (!is_null($order)) {
            $this->order($order);
        }
        if(!is_null($limit)){
            $this->limit($limit);
        }

        $result = $this->select();

        $this->showSql();
        return $result;
    }

    public function getList($where, $value=null, $fields = null, $order = null, $page = 1, $size = 10) {

        //参数分析
        if (!$where) {
            return false;
        }
        //获取数据表名
        $this->getTableName();

        //分析查询的字段信息
        $this->field($fields);
        //处理查询的SQL语句
        $this->where($where, $value);
        //处理排序的SQL语句
        if (!is_null($order)) {
            $this->order($order);
        }
        //处理limit语句
        //if (!is_null($offset)) {
        //    $this->options['limit'] = '';
        //    $this->limit($offset);
        //}

        if($page<1 || !is_numeric($page)){
            $page = 1;
        }

        if($size<1 || !is_numeric($size)){
            $size = 10;
        }

        $offset = (($page-1)*$size).','.$size;
        $this->limit($offset);

        $result = $this->select();

        $this->showSql();

        return $result;
    }


    /**
     * 查询数据表单行数据
     *
     * 根据一个查询条件，获取一行数据，返回数据为数组型，索引为数据表字段名
     */
    public function getOne($where, $value = null, $fields = null) {
        //参数分析
        if (!$where) {
            return false;
        }
        //分析查询的字段信息
        $this->field($fields);
        //处理查询的SQL语句
        $this->where($where, $value);
        $result = $this->find();

        $this->showSql();

        return $result;
    }

    public function getById($id, $fields=null, $show_deleted = false){

        $where = $this->getPk() .' = '. $id;
        if(!$show_deleted){
            $where .= ' AND del_flag = 0';
        }

        $result = $this->getOne($where, null, $fields);
        return $result;
    }

    public function insert($data='',$options=array(),$replace=false) {
        if(empty($data['created'])){
            $data['created'] = date('Y-m-d H:i:s');
        }
        return $this->add($data,$options,$replace);
    }


    public function buildSelectOptions($field, $where=null, $value=null, $order=null){
        if (empty($where)) {
            $where = 'del_flag = 0';
        }
        //获取数据表名
        $this->getTableName();

        //处理查询的SQL语句
        $this->where($where, $value);

        //处理排序的SQL语句
        if (!is_null($order)) {
            $this->order($order);
        }

        $result = $this->getField($field);

        $this->showSql();

        return $result;
    }


    public function transParamsToWhere($condition_params,$is_join=false,$join_params=array()){
        $where = array();
        if(!is_array($condition_params)){
            return array();
        }
        unset($condition_params['limit']);

        foreach($condition_params as $param_key => $param_value){
            if(!empty($param_value) && is_array($param_value)){
                foreach($param_value as $param_value_key => $sub_param_value){
                    if(!empty($sub_param_value)){
                        if($param_value_key=='keyword'){
                            array_push($where,$this->transKeywordToSql($sub_param_value,$param_key));
                        }else{
                            array_push($where,$param_key.'.'.$param_value_key.$sub_param_value);
                        }
                    }
                }
            }else{
                if(!empty($param_value)){
                    if($param_key=='keyword'){
                        array_push($where,$this->transKeywordToSql($sub_param_value));
                    }else{
                        array_push($where,$param_key.$param_value);
                    }
                }
            }
        }
        if(!empty($where) && $is_join && !empty($join_params)){
            $where = str_replace($join_params['subject'],$join_params['replace'],$where);
        }

        return $where;
    }
    public function transKeywordToSql($keyword_data,$join_pre=""){
        $keyword_temp_array = array();
        if(!empty($join_pre)){
            $join_pre = $join_pre.'.';
        }
        foreach($keyword_data['fields'] as $keyword_field){
            array_push($keyword_temp_array,$join_pre.$keyword_field." like '%".$keyword_data['value']."%'");
        }
        return "(".implode(' or ',$keyword_temp_array).")";
    }

    public function getCondition($where, $params){

        foreach($params as $key=>$val){

            if(!empty($val)||is_numeric($val)){
                $where = str_replace('#'.$key.'#', $val, $where);
            }
        }

        $conditions = explode(' AND ', $where);
        $result = array();
        foreach($conditions as $cond){
            if(strpos($cond, '#')===false){
                $result[] = $cond;
            }
        }
        return implode(' AND ', $result);
    }

    public function loadPageData($where, $value=null, $fields=null, $order=null, &$page=1, $pageSize=10){

        //获取记录总数
        $result['pageSize'] = $pageSize;
        $result['total'] = $this->getCount($where);

        $result['totalPage'] = ceil($result['total']/$pageSize);
        if($page>$result['totalPage']){
            $page = $result['totalPage'];
        }

        //获取分页数据
        $result['aaData'] = $this->getList($where, $value, $fields, $order, $page, $pageSize);
        if(empty($result['aaData'])){
            $result['aaData']=array();
        }

        return $result;
    }

    public function adminPageData($where, $fields=null, $order=null, $page=1, $size=10){

        $result['iTotalRecords'] = $size;
        $result['iTotalDisplayRecords']= $this->getCount($where);
        $result['aaData'] = $this->getList($where, null, $fields, $order, $page, $size);

        if(empty($result['aaData'])){
            $result['aaData']=array();
        }

        return $result;
    }

    public function update($data){
        $pk = $this->getPk();
        if (empty($data[$pk])) {
            return false;
        }
        else {
            $where = $pk . '=' . $data[$pk];
            $result = $this->where($where)->save($data);
            return $result;
        }
    }

    public function deleteById($id){

        $where = $this->getPk() .' = '. $id;

        $data['deleted'] = date('Y-m-d H:i:s');
        return $this->where($where)->save($data);
    }

    public function showSql(){
        if (isset($_GET['showSql']) && $_GET['showSql']){
            echo $this->getLastSql().'<br>';
        }
    }

    public function _before_insert(&$data,$options) {
        if(empty($data['created'])){
            $data['created'] = date('Y-m-d H:i:s');
        }
        if(empty($data['modified'])){
            $data['modified'] = date('Y-m-d H:i:s');
        }
        return true;
    }


    public function getNotDeleteCondition($prefix='') {
        return array($prefix.'deleted' => array('exp', 'is null'));
    }

    public function getRowByProperty($propertyName, $value, $isAll = true) {
        $condition = $this->getNotDeleteCondition();
        $condition[$propertyName] = $value;

        if($isAll) {
            return $this->where($condition)->select();
        } else {
            return $this->where($condition)->find();
        }
    }
    public function percentToFloat($percent){
        $num = substr($percent,0,strpos($percent,'%'));
        if(empty($num) || $num == '0'){
            return 0 ;
        } else {
            return intval($num)/100;
        }
    }

}

