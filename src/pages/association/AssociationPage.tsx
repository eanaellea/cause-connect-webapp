import { useGlobalStore } from "@/store/store";
import { FC } from "react";
import { Alert } from 'antd';

import { AssociationCard } from "@/designSystem/associationProfile/AssociationCard";
import styles from './AssociationPage.module.scss'

export const AssociationPage: FC = () => {

  const association = useGlobalStore(state => state.association!)

  return (
    <div className={styles.profile}>
      <h1>Informations de l'association</h1>
      <Alert message="Le changement du logo ne demande aucune confirmation." type="info" showIcon/>
      <AssociationCard association={association} />
    </div>
  )
}