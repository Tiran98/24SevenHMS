import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 800,
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    paperTitle: {
        backgroundColor: '#023e8a',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paper: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        color: '#6e6e6e',
    },
    submitbtn: {
        backgroundColor: '#023e8a',
        color: '#ffffff',
        padding: "15px",
    },
    resetbtn: {
        backgroundColor: '#6e6e6e',
        color: '#ffffff',
        padding: "15px",
    },
    note: {
        padding: "10px",
        color: "#0077B6",
        fontWeight: "500"
    }
}));