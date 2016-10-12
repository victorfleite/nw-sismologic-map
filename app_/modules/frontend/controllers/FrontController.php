<?php

namespace app\modules\frontend\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use app\modules\frontend\models\EstacaoJson;
use app\modules\frontend\models\EstacaoJsonManager;
use app\modules\frontend\models\CodarJsonManager;

/**
 * FrontController implements the CRUD actions for Emergencia model.
 */
class FrontController extends Controller {
	
			
	/**
	 * Listagem de todas as Emergencias de Hoje.
	 *
	 * @return mixed
	 */
	public function actionListaDeEstacoes() {						
		$manager = new EstacaoJsonManager();	
		\Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
		return $manager->getEstacoesList();	
		
	}

	
	/**
	 * Get Emergencia
	 * @param unknown $id
	 * @return \app\modules\frontend\models\EmergenciaJson
	 */
	public function actionEstacao($id){
	
	}
	
	
}
