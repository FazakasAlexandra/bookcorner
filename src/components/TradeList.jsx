import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TradeList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    props.setTradedBooks(newChecked)
    setChecked(newChecked);
  };

  const getList = () => {
    const unproposedBooks = props.user.books.filter((book) => book.proposed_for === null)

    if(unproposedBooks.length > 0) {
      return unproposedBooks.map((book) => {
        const labelId = `checkbox-list-secondary-label-${book.id}`;
          return (
            <ListItem key={book.id} button>
              <ListItemAvatar>
                <Avatar
                  alt={`book cover`}
                  src={book.cover}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={book.title} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(book.id)}
                  checked={checked.indexOf(book.id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
      })
    } else {
      return <p style={{padding: '2rem', textAlign: 'center'}}>No books available for trade</p>
    }
  }

  return (
    <List dense className={classes.root}>
      {getList()}
    </List>
  );
}
