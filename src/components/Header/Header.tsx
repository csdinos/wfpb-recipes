import * as React from 'react'
import {Box, Grid, Typography} from '@material-ui/core'
import { withRouter } from 'react-router-dom'

function Header({ history }) {
  return (
    <Grid container className="header">
      <Grid item xs={4}>
        <Box paddingY={2}>
          <Typography
            variant="h4"
            gutterBottom
            style={{cursor: 'pointer'}}
            onClick={() => history.push('/')}
          >
            WFPB Recipes
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default withRouter(Header)
