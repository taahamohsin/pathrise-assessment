import React, { Fragment, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Button, Result, Table } from 'antd';

import FullPageSpinner from '../full-page-spinner/FullPageSpinner.jsx';

const SourceDrillDown = () => {
  const params = useParams();
  const [source, setSource] = useState(null);
  const [sourceRetrievalError, setSourceRetrievalError] = useState(false);

  const getSourceData = async () => {
    try {
      const response = await fetch(`/sources/${params.sourceId}`);
      const data = await response.json();
      setSource(data);
      setSourceRetrievalError(false);
    } catch (e) {
      setSourceRetrievalError(true);
    }
  }

  useEffect(() => {
    getSourceData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
    },
    {
      title: 'Job URL',
      dataIndex: 'job_url'
    }
  ];

  return (
    <Fragment>
      {!source && !sourceRetrievalError && <FullPageSpinner />}
      {sourceRetrievalError && (
        <Result
          title="Error"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" onClick={getSourceData}>Reload</Button>
          }
        />
      )}
      {source && (
        <Table
          columns={columns}
          dataSource={source.opportunities.map(opp => ({ ...opp, key: opp.id }))}
        />
      )}
    </Fragment>

  );
}

export default SourceDrillDown;