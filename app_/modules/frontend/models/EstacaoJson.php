<?php

namespace app\modules\frontend\models;

use Yii;
use yii\base\Model;
use yii\helpers\Json;
use app\components\Util;

class EstacaoJson extends Model{
	
	public $codigo;
	public $nome;
	public $orgao;
	public $cidade;
	public $uf;
	public $latitude;
	public $longitude;
	public $altitude;
	public $disme;
	public $situacao;	
	
	public function setCodigo($codigo){		
		$this->codigo = $codigo;	
	}	
	public function setNome($nome){		
		$this->nome = $nome;	
	}	
	public function setOrgao($orgao){		
		$this->orgao= $orgao;	
	}
	public function setCidade($cidade){		
		$this->cidade= $cidade;	
	}	
	public function setUf($uf){		
		$this->uf= $uf;	
	}		
	public function setLatitude($latitude){		
		$this->latitude = $latitude;	
	}
	public function setLongitude($longitude){		
		$this->longitude = $longitude;	
	}
	public function setAltitude($altitude){
		$this->altitude = $altitude;
	}
	public function setDisme($disme){
		$this->disme = $disme;
	}
	public function setSituacao($situacao){
		$this->situacao = $situacao;
	}
	
}
