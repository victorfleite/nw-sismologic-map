<?php
namespace app\modules\frontend\models;

use yii\helpers\Json;
use app\modules\frontend\models\EstacaoJson;
use app\modules\frontend\models\Estacao;

class EstacaoJsonManager
{
	private $estacoesList = array();
	
	public function addEstacao($estacaoJson){
		$this->estacoesList[] = $estacaoJson;
	}
	
	public function getEstacoesList()
	{
			

		$sql = " SELECT estacaosimplescodigo, UPPER(estacaosimplesnome) as estacaosimplesnome, estacaosimplescidade, ".
       		   " estacaosimplesuf, estacaosimpleslatitude, estacaosimpleslongitude, ".
       		   " estacaosimplesaltitude, estacaosimplesorgao, estacaosimplesdisme, ". 
       		   " estacaosimplesdataultalt, estacaosimplessituacao ".
  			   " FROM cadestacaosimples where estacaosimplescodigo like :param;";
  		$estacoes = Estacao::findBySql($sql, [':param' => 'P%'])->all();

  		if(!empty($estacoes)){
			foreach($estacoes as $estacao){

				if($this->validDataConsistence($estacao)){
					$estacaoJson = new EstacaoJson();
					$estacaoJson->setCodigo($estacao->estacaosimplescodigo);
					$estacaoJson->setNome($estacao->estacaosimplesnome);
					$estacaoJson->setOrgao($estacao->estacaosimplesorgao);
					$estacaoJson->setCidade($estacao->estacaosimplescidade);
					$estacaoJson->setUf($estacao->estacaosimplesuf);
					$estacaoJson->setLatitude(round($estacao->estacaosimpleslatitude,2));
					$estacaoJson->setLongitude(round($estacao->estacaosimpleslongitude, 2));
					$estacaoJson->setAltitude($estacao->estacaosimplesaltitude);
					$estacaoJson->setDisme($estacao->estacaosimplesdisme);
					$estacaoJson->setSituacao($estacao->estacaosimplessituacao);
					$this->addEstacao($estacaoJson);	
				}
				
			}
  		}
 		

		
			
		return $this->estacoesList;
	}
	public function validDataConsistence($estacao){
		$valid = true;
		if(!is_numeric($estacao->estacaosimpleslatitude)){
			$valid = false;
		}
		if(!is_numeric($estacao->estacaosimpleslongitude)){
			$valid = false;
		}
		return $valid;
	}
	
}
