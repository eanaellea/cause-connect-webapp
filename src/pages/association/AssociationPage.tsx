import { useGlobalStore } from "@/store/store";
import { FC } from "react";
import { Alert } from 'antd';

import { AssociationCard } from "@/designSystem/associationProfile/AssociationCard";
import styles from './AssociationPage.module.scss'

export const AssociationPage: FC = () => {

  const association = useGlobalStore(state => state.user?.association)

  return (
    association === undefined ? null :
    <div className={styles.profile}>
      <h1>Informations de l'association</h1>
      <Alert message="Le changement du logo est irreversible." type="warning" />
      <AssociationCard association={association} />
    </div>
  )
}