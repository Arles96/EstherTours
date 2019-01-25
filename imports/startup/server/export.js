/**
 * Funcion para convertir un arreglo en un documento csv
 * @param {data, columnDelimiter, lineDelimiter} args
 */

function convertArrayOfObjectsToCSV (args) {
  let result;
  let ctr = 0;

  const data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  const columnDelimiter = args.columnDelimiter || ',';
  const lineDelimiter = args.lineDelimiter || '\n';

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++; // eslint-disable-line
    });
    result += lineDelimiter;
  });
  console.log('result');
  console.log(result);
  return result;
}

export default convertArrayOfObjectsToCSV;
