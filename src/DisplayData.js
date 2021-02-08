import React from 'react';
import {CardItem, Container, Content, Card,Text} from 'native-base';

const DisplayData = (props) => {
  return (
      <Content>
        <Card>
          <CardItem header bordered>
            <Text>{`Title: ${props.title}`}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{`URL: ${props.URL}`}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{`Created_at: ${props.created_at}`}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{`Author: ${props.author}`}</Text>
          </CardItem>
        </Card>
      </Content>
  );
};
export default DisplayData;
