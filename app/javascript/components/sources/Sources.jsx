import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Result, Row, Col, Typography } from "antd";
import { useHistory } from 'react-router-dom';

import FullPageSpinner from '../full-page-spinner/FullPageSpinner.jsx';
import { RATINGS } from "../../helpers/constants";

const Sources = () => {
  const [sources, setSources] = useState(null);
  const [sourcesRetrievalError, setSourcesRetrievalError] = useState(false);
  const history = useHistory();

  const getSourcesData = async () => {
    try {
      const response = await fetch("/sources");
      const data = await response.json();
      const transformedData = [];
      for (let i = 0; i < data.length; i += 3) {
        transformedData.push(data.slice(i, i + 3));
      }
      setSources(transformedData);
      setSourcesRetrievalError(false);
    } catch (e) {
      setSourcesRetrievalError(true);
    }
  };

  useEffect(() => {
    getSourcesData();
  }, []);

  const { Meta } = Card;
  const { Paragraph } = Typography;

  const ratingColorPicker = color => {
    switch (color) {
      case RATINGS.POOR:
        return "red";
      case RATINGS.OKAY:
        return "orange";
      case RATINGS.GOOD:
        return "blue";
      case RATINGS.GREAT:
        return "green";
      default:
        return "black";
    }
  };

  return (
    <div style={{ padding: "10px", background: "#ececec" }}>
      {!sources && !sourcesRetrievalError && <FullPageSpinner />}
      {sourcesRetrievalError && (
        <Result
          title="Error"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" onClick={getSourcesData}>Reload</Button>
          }
        />
      )}
      {sources &&
        sources.map(sourceGroup => (
          <Row
            key={sourceGroup[0].id + sourceGroup[1].id}
            gutter={16}
            style={{ paddingBottom: "10px" }}
          >
            {sourceGroup.map(source => (
              <Col span={8}>
                <Card
                  key={source.id}
                  bodyStyle={{ padding: "0.5rem", height: "10rem" }}
                  onClick={() => {
                    history.push(`/sources/${source.id}`)
                  }}
                  hoverable
                >
                  <div
                    style={{
                      paddingBottom: "0.5rem",
                      display: "flex",
                      justifyContent: "flex-end",
                      color: ratingColorPicker(source.rating)
                    }}
                  >
                    {source.rating}
                  </div>
                  <Meta
                    avatar={
                      <Avatar src={source.logo_file} shape="square" size={50} />
                    }
                    description={
                      <Paragraph
                        ellipsis={{
                          rows: 4,
                          tooltip: (
                            <Paragraph style={{ color: "white" }}>
                              {source.description}
                            </Paragraph>
                          )
                        }}
                      >
                        {source.description}
                      </Paragraph>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
};

export default Sources;
