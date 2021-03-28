import MaterialTable from 'material-table';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import BooksDatabase from '../database/books.js'
import UsersDatabase from '../database/users.js'
import React, { useState } from "react";

export default function BooksTable(props) {
    const theme = createMuiTheme({
        zIndex: '-1'
    });

    const [columns, setColumns] = useState([
        { title: 'Cover', field: 'cover', render: rowData => <img src={rowData.cover} style={{ width: 40 }} />, editable: 'never' },
        { title: 'Title', field: 'title' },
        { title: 'Author', field: 'author', initialEditValue: 'initial edit value' },
        { title: 'Pages', field: 'pages', type: 'numeric' },
        {
            title: 'Condition',
            field: 'condition_fk',
            lookup: { 1: 'new', 2: 'very good', 3: 'good', 4:'damaged by water', 5:'old', 6:'used' },
            type: 'string'
        },
        { title: 'Publishing House', field: 'publishing_house', type: 'string' },
    ]);

    const [data, setData] = useState(props.user.books);
    const booksDatabase = new BooksDatabase;
    const usersDatabase = new UsersDatabase;

    return (
        <MuiThemeProvider theme={theme} style={{ zIndex: 0 }}
        >
            <MaterialTable
                title="MY BOOKS"
                columns={columns}
                data={data}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        return booksDatabase.updateBook(newData).then((res)=>{

                            usersDatabase.getUser(props.user.id).then((res)=>{
                                props.setUser(res.data)
                            })

                            console.log(res.message)
                            
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                        })
                    },
                    onRowDelete: (oldData) => {
                        return booksDatabase.deleteBook(oldData.id).then((res)=>{
                
                            usersDatabase.getUser(props.user.id).then((res)=>{
                                props.setUser(res.data)
                            })
                            
                            console.log(res.message)

                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                        })
                    }

                }}
            />
        </MuiThemeProvider>
    )
}
