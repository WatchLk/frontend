// import React, { useState, useEffect } from 'react';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import {
//   Box,
//   Card,
//   makeStyles,
//   Container,
//   Divider,
//   CardContent,
//   Grid,
//   TextField,
//   MenuItem,
//   InputLabel,
//   CardHeader,
// } from '@material-ui/core';
// import Page from 'src/components/Page';
// import PageHeader from 'src/views/Common/PageHeader';
// import services from '../Services';
// import { useNavigate } from 'react-router-dom';
// import { trackPromise } from 'react-promise-tracker';
// import tokenService from '../../../utils/tokenDecoder';
// import authService from '../../../utils/permissionAuth';
// import MaterialTable from "material-table";
// import Button from '@material-ui/core/Button';
// import xlsx from 'json-as-xlsx';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   },
//   avatar: {
//     marginRight: theme.spacing(2)
//   }
// }));

// const screenCode = 'ACCOUNTINGCUSTOMERS';
// export default function AccountingCustomersListing(props) {
//   const classes = useStyles();
//   const [groups, setGroups] = useState();
//   const [factories, setFactories] = useState();
//   const [customerList, setCustomerList] = useState({
//     groupID: '0',
//     factoryID: '0',
//   });

//   const [customersData, setCustomersData] = useState([]);
//   const [hasFetchedData, setHasFetchedData] = useState(false);
//   const navigate = useNavigate();
//   let encryptedID = "";
//   const [permissionList, setPermissions] = useState({
//     isGroupFilterEnabled: false,
//     isFactoryFilterEnabled: false,
//   });

//   async function createFile() {
//     const fileData = await prepareExcelData(customersData);
//     const settings = {
//       sheetName: 'Accounting Customers ' ,
//      fileName: 'Accounting Customers Report - ' + factories[customerList.factoryID]+' in '+ groups[customerList.groupID]
//     };
//     const dataForExcel = [
//       {
//         sheet: 'Accounting Customers',
//         columns: [
//           { label: 'Customer Name', value: 'customerName' },
//           { label: 'Customer Address', value: 'customerAddress' },
//           { label: 'NIC / BR Number', value: 'nicBRNumber' },
//           { label: 'Status', value: 'status' },
//         ],
//        content: fileData
//       }
//   ];
//   xlsx(dataForExcel, settings);
//   }
//   async function prepareExcelData(data) {
//     let excelData = []; 
//     customersData.forEach(customer => {
//       const totalRow = {
//         customerName: customer.customerName,
//         customerAddress: customer.customerAddress,
//         nicBRNumber:customer.nicBRNumber ,
//         status: customer.isActive ? 'Active' : 'Inactive'
//       };
//       excelData.push(totalRow);
//     })
//     excelData.push({});
//     excelData.push({
//       customerName: 'Group Name:',
//       customerAddress: groups[customerList.groupID],
//     });
//     excelData.push({
//       customerName: 'Factory Name:',
//       customerAddress:factories[customerList.factoryID],
//     });
//     excelData.push({
//       customerName: 'Exported Date:',
//       customerAddress: new Date().toLocaleDateString(),
//     });
//     return excelData;
//   }

//   const handleClick = () => {
//     encryptedID = btoa('0');
//     navigate('/app/accountingCustomers/addedit/' + encryptedID);
//   }

//   const EditCustomerDetails = (customerID) => {
//     encryptedID = btoa(customerID.toString());
//     navigate('/app/accountingCustomers/addedit/' + encryptedID);
//   }

//   useEffect(() => {
//     trackPromise(
//       getGroupsForDropdown(), getPermission()
//     );
//   }, []);

 
//   useEffect(() => {
//     getCustomersByGroupIDAndFactoryID();
//   })

//   async function getPermission() {
//     var permissions = await authService.getPermissionsByScreen(screenCode);
//     var isAuthorized = permissions.find(p => p.permissionCode == 'VIEWLISTINGACCOUNTINGCUSTOMERS');

//     if (isAuthorized === undefined) {
//       navigate('/404');
//     }
//     var isGroupFilterEnabled = permissions.find(p => p.permissionCode == 'GROUPDROPDOWN');
//     var isFactoryFilterEnabled = permissions.find(p => p.permissionCode == 'FACTORYDROPDOWN');

//     setPermissions({
//       ...permissionList,
//       isGroupFilterEnabled: isGroupFilterEnabled !== undefined,
//       isFactoryFilterEnabled: isFactoryFilterEnabled !== undefined,

//     });

//     setCustomerList({
//       ...customerList,
//       groupID: parseInt(tokenService.getGroupIDFromToken()),
//       factoryID: parseInt(tokenService.getFactoryIDFromToken())
//     })
//   }

//   async function getFactoriesForDropDown() {
//     const factory = await services.getFactoryByGroupID(customerList.groupID);
//     setFactories(factory);
//   }

//   async function getGroupsForDropdown() {
//     const groups = await services.getGroupsForDropdown();
//     setGroups(groups);
//   }

//   async function getCustomersByGroupIDAndFactoryID(groupID = customerList.groupID, factoryID = customerList.factoryID) {
//     if (!groupID || !factoryID || groupID === '0' || factoryID === '0') {
//       setCustomersData([]); // Clear data if no valid selection
//       return;
//     }
  
//     const result = await services.getCustomersByGroupIDAndFactoryID(parseInt(groupID), parseInt(factoryID));
//     setCustomersData(result);
//     setHasFetchedData(true);  // Mark that search has been performed
//   }
  
  

//   function generateDropDownMenu(data) {
//     let items = []
//     if (data != null) {
//       for (const [key, value] of Object.entries(data)) {
//         items.push(<MenuItem key={key} value={key}>{value}</MenuItem>);
//       }
//     }
//     return items
//   }

//  function handleChange(e) {
//     const { name, value } = e.target;

//     setCustomerList(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
//   if (name === "factoryID" && hasFetchedData) {
//         getCustomersByGroupIDAndFactoryID(updatedState.groupID, value);
//      }
// }

  

//   function cardTitle(titleName) {
//     return (
//       <Grid container spacing={1}>
//         <Grid item md={10} xs={12}>
//           {titleName}
//         </Grid>
//         <Grid item md={2} xs={12}>
//           <PageHeader
//             onClick={handleClick}
//             isEdit={true}
//             toolTiptitle={"Add Accounting Customers"}
//           />
//         </Grid>
//       </Grid>
//     )
//   }

//   return (
//     <Page
//       className={classes.root}
//       title="Accounting Customers"
//     >
//       <Container maxWidth={false}>
//         <Box mt={0}>
//           <Card>
//             <CardHeader
//               title={cardTitle("Accounting Customers")}
//             />
//             <PerfectScrollbar>
//               <Divider />
//               <CardContent style={{ marginBottom: "2rem" }}>
//                 <Grid container spacing={3}>
//                   <Grid item md={4} xs={12}>
//                     <InputLabel shrink id="groupID">
//                       Group  *
//                     </InputLabel>
//                     <TextField select
//                       fullWidth
//                       name="groupID"
//                       onChange={(e) => handleChange(e)}
//                       value={customerList.groupID}
//                       variant="outlined"
//                       disabled={!permissionList.isGroupFilterEnabled}
//                       size='small'
//                     >
//                       <MenuItem value="0">--Select Group--</MenuItem>
//                       {generateDropDownMenu(groups)}
//                     </TextField>
//                   </Grid>
//                   <Grid item md={4} xs={12}>
//                     <InputLabel shrink id="factoryID">
//                       Factory *
//                     </InputLabel>
//                     <TextField select
//                       fullWidth
//                       name="factoryID"
//                       onChange={(e) => handleChange(e)}
//                       value={customerList.factoryID}
//                       variant="outlined"
//                       id="factoryID"
//                       disabled={!permissionList.isFactoryFilterEnabled}
//                       size='small'
//                     >
//                       <MenuItem value="0">--Select Factory--</MenuItem>
//                       {generateDropDownMenu(factories)}
//                     </TextField>
//                   </Grid>
//                   <Grid item md={4} xs={12} mt={1}>
//                           <Box>
//                             <Button
//                               color="primary"
//                               variant="contained"
//                               type="submit"
//                               onClick={() => getCustomersByGroupIDAndFactoryID()} 
//                             >
//                               Search
//                             </Button>
//                           </Box>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//               <Box minWidth={1050} marginLeft='1rem' marginRight='2rem' marginBottom='2rem'>

//                 <MaterialTable
//                   title="Multiple Actions Preview"
//                   columns={[
//                     { title: 'Customer Name', field: 'customerName' },
//                     { title: 'Customer Address', field: 'customerAddress' },
//                     { title: 'NIC/BR Number', field: 'nicBRNumber' },
//                     { title: 'Status', field: 'isActive', render: rowData => rowData.isActive == true ? 'Active' : 'Inactive' },
//                   ]}
//                   data={customersData}
//                   options={{
//                     exportButton: false,
//                     showTitle: false,
//                     headerStyle: { textAlign: "left", height: '1%' },
//                     cellStyle: { textAlign: "left" },
//                     columnResizable: false,
//                     actionsColumnIndex: -1
//                   }}
//                   actions={[
//                     {
//                       icon: 'mode',
//                       tooltip: 'Edit Customer',
//                       onClick: (event, rowData) => { EditCustomerDetails(rowData.customerID) }
//                     },
//                   ]}
//                 />
//                 {customersData.length != 0 ?
//                 <Box display="flex" justifyContent="flex-end" pt={2}>
//                             <Button
//                               color="primary"
//                               id="btnRecord"
//                               type="submit"
//                               variant="contained"
//                               style={{ marginRight: '1rem' }}
//                               className={classes.colorRecord}
//                               onClick={() =>createFile() }
//                             >
//                               EXCEL
//                             </Button>
//                           </Box> :null}
//               </Box> 
//             </PerfectScrollbar>
//           </Card>
//         </Box>
//       </Container>
//     </Page>
//   );
// };