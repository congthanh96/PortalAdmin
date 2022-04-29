// Add toolbar to export data to csv
// Huynh-dt
// 2022/04/13 - 2022/04/14

import { GridToolbarContainer, GridToolbarExport } from "@material-ui/data-grid";
export default function CustomToolbar(title) {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: `Manage ${title}`,
          utf8WithBom: true,
        }} />
    </GridToolbarContainer>
  );
}