<?php

namespace app\modules\frontend\models;

use Yii;

/**
*
 */
class Estacao extends \yii\db\ActiveRecord
{

    /*public static function getDb() {
        return Yii::$app->db;
    }*/
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cadestacaosimples';
    }


}
