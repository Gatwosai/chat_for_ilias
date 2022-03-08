<?php /** @noinspection ALL */

require_once("./include/nusoap.php");
require_once("./include/xml2array.php");


class ILIAS_CONNECTOR{
	public static function ILConnect($login, $password){
		$client = ILIAS_SOAP::GetClient();
		$session_id = ILIAS_SOAP::Login($client, $login, $password); //Вход в систему
		return $session_id;
	}
	public static function ILDisConnect($session_id){
		$client = ILIAS_SOAP::GetClient();
		$result = ILIAS_SOAP::Logout($client,  $session_id);
		return $result;
	}
}

class ILIAS_SOAP {
	private static $ilias_base_url = "http://localhost/"; //здесь указать адрес до ILIAS, который установлен локально
	private static $ilias_client = "test1"; //здесь указать Client ID, который прописан во время установки

	public static function GetClient(){
		$wsdl = self::$ilias_base_url."/webservice/soap/server.php?wsdl";
		$client = new nusoap_client($wsdl, true);
		return $client;
	}

	public static function Login($client, $login, $password){
		$par = array(
			"client" => self::$ilias_client,
			"username" => $login,
			"password" => $password,
		);
		$ret = $client->call("login", $par);
		return $ret;
	}

	public static function Logout($client, $session_id){
		$par = array(
			"sid" => $session_id
		);
		$ret = $client->call("logout", $par);
		return $ret;
	}
}
?>
