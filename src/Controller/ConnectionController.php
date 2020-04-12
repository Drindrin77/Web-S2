<?php

if(!defined('CONST_INCLUDE'))
    die('Acces direct interdit !');

class ConnectionController extends Controller{
    
    private $model;
    
	public function __construct() {
		$this->model = new UserModel();
    }

    public function example(){
        $data = $this->model->example();
        $this->setViewModel('Connection',[]);
    }

    public function execute($action){
        $this->setViewModel('Connection');
    }
    
    private function createToken($email){
        $token = $this->model->getSessionToken($email);
        setcookie("token", $token, mktime().time()+60*60*24*30);
        setcookie("token", $email, mktime().time()+60*60*24*30);//expiration dans 30j
        $_SESSION['uniqid'] = bin2hex(random_bytes(32));
    }

    private function verifyToken(){
        session_start();
        if(isset($_COOKIE['token']) && isset($_COOKIE['email'])){
            if($_COOKIE['token'] == $this->model->getSessionToken($_COOKIE['email'])){
                createToken($_COOKIE['email']);
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    //Verification CSRF
    public function verifyConnection(){
        if(isset($_POST['email']) && $_POST['password']){
            $mail = $_POST['email'];
            $password = $_POST['password'];
            $passwordCrypted = password_hash($password, PASSWORD_DEFAULT);
            $res = $this->model->verifyUserConnection($mail, $passwordCrypted);
            //Test pour bien parser les inputs pour pas d'injection
            if($res){
                if( isset($_POST['rememberMe']) ){
                    if($_POST['rememberMe'] == "on"){
                        $this->createToken($mail);
                    }
                }else{
                    $_SESSION['uniqid'] = bin2hex(random_bytes(32));
                }
                //Go To Pécho
                header("Location: /");
            }else{
                header("Location: /connection?email=$mail");
                //Return to Connection
            }
        }else{
            header("Location: /connection");
        }
        //$passwordCrypted = password_hash($password, PASSWORD_DEFAULT); (Pour register)
    }
}

?>