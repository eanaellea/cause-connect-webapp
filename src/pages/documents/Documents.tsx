import { Button, Input } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { FC } from "react";
import styles from './Documents.module.scss'

export const Documents: FC = () => {
  return (
    <div>
      <h1>Coffre fort numérique</h1>
      <div className={styles.documentsHeader}>
        <Button type="primary" icon={<FileAddOutlined />} onClick={() => alert('open modal')}>Ajouter un document</Button>
        <Input.Search placeholder="Rechercher un document" />
      </div>
    </div>
  )
} 
