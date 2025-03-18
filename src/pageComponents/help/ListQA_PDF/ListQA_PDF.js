import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { decodeHTMlToText } from 'src/shared/utils/String';

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

export function PdfDocument({ title, data }) {
  return (
    <Document>
      <Page style={styles.page} size='A4'>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>{title}</Text>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                <Text style={styles.title}>
                  {index + 1}. {item.display_name}
                </Text>
                <View style={styles.itemInfo}>
                  <Text style={styles.content}>
                    {decodeHTMlToText(item.content)}
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
