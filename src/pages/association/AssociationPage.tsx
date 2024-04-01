import { AssociationCard } from "@/designSystem/associationProfile/AssociationCard";
import { useGlobalStore } from "@/store/store";
import { FC } from "react";

import styles from './AssociationPage.module.scss'

export const AssociationPage: FC = () => {

  const association = useGlobalStore(state => state.user?.association)

  return (
    association === undefined ? null :
    <div>
      <h1>Informations de l'association</h1>
      <AssociationCard association={association} />
    </div>
  )
}