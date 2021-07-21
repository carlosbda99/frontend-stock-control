import React from "react";
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TableContainer,
    Paper,
    LinearProgress
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RouteComponentProps } from "react-router";


import Category from "../../interfaces/Category";
import useStyles from "../../style/style";
import MatchParams from "../../interfaces/MatchParams";
import ProductTable from "./components/ProductTable";

function CategoryDetail(props: RouteComponentProps<MatchParams>) {
    const classes = useStyles()
    const [category, setCategory] = React.useState<Category | null>(null)

    const getData = async () => {
        let category: Category | null = null
        await fetch(`https://guarded-cliffs-79935.herokuapp.com//api/v1/categories/${props.match.params.id}`)
            .then(res => res.json())
            .then(res => {
                category = res.category
            })
        setCategory(category)
    }

    React.useEffect(() => {
        getData()
    }, [])

    if (!category) return <LinearProgress></LinearProgress>

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} className={classes.paper}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography color="textPrimary" variant='h5' gutterBottom>
                            {category.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="h2">
                            Descrição: {category.description}
                        </Typography>
                        {category.products.length > 0 ? (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant='h6' >Produtos</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid item xs={12} className={classes.paper}>
                                        <TableContainer component={Paper}>
                                            <ProductTable category={category}></ProductTable>
                                        </TableContainer>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                        ) : (
                            <Typography variant='h6'>Sem fornecedor</Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CategoryDetail