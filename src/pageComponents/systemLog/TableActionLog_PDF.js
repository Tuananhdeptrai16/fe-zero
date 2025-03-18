import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { toDateTime } from 'src/shared/utils/filter';

const mapFontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

Font.register({
  family: 'Roboto',
  fonts: Object.keys(mapFontWeight)
    .map((fontWeight) => [
      {
        src: `/assets/fonts/Roboto/${fontWeight}.ttf`,
        fontWeight: fontWeight,
        fontStyle: 'normal',
      },
      {
        src: `/assets/fonts/Roboto/${fontWeight}Italic.ttf`,
        fontWeight: fontWeight,
        fontStyle: 'italic',
      },
    ])
    .flat(),
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 13,
  },
  container: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 16,
    marginBottom: 22,
    textAlign: 'center',
  },
  item: {
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
  },
  content: {
    fontSize: 12,
    marginLeft: 12,
  },
  itemInfo: {},
});

export function PdfDocumentTable({ title, data }) {
  return (
    <Document>
      <Page style={styles.page} size='A4'>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>{title}</Text>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Text style={styles.title}>
                  {index + 1}. {toDateTime(item.start_time)}
                </Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.content}>
                    Người dùng:{' '}
                    {[
                      item?.user_info_response?.first_name,
                      item?.user_info_response?.last_name,
                    ]
                      .filter((name) => !!name)
                      .join(' ')}{' '}
                    - {item?.user_info_response?.email} - {item.ip_address}
                  </Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.content}>
                    Request: {item.request_body}
                  </Text>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.content}>
                    Response: {item.response_body}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
