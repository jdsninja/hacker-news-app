import React, { Component } from 'react';
import { initialize } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import actions from './playersActions';
import Typography from '@material-ui/core/Typography';
const styles = {
    card: {
      maxWidth: 275,
      display: 'inline-block',
      marginRight: 40
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };
  
class Players extends Component {
  componentWillMount = () => {
    this.props.getPlayers();
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    console.log('HERE', this.props.players)
    return (
      <div>
        <Card className={classes.card}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary">
                Word of the Day
            </Typography>
            <Typography variant="headline" component="h2">
                be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                adjective
            </Typography>
            <Typography component="p">
                well meaning and kindly.<br />
                {'"a benevolent smile"'}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardContent>
          <Typography className={classes.title} color="textSecondary">
              Word of the Day
          </Typography>
          <Typography variant="headline" component="h2">
              be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
              adjective
          </Typography>
          <Typography component="p">
              well meaning and kindly.<br />
              {'"a benevolent smile"'}
          </Typography>
          </CardContent>
          <CardActions>
          <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  getPlayers: partner => dispatch(actions.getPlayers(partner)),
  deletePartner: id => dispatch(actions.deletePartner(id)),
  initiateSearchForm: form => dispatch(initialize('PLAYERS_FORM', form)),
  updateQuery: query => dispatch(actions.updatePartnersQuery(query)),
});

const mapStateToProps = state => ({
  players: state.players.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Players));

