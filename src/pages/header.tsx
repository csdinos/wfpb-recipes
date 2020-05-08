import * as React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

const styles = {
  container: {
    padding: '20px 0'
  }
}
function HeaderComponent({ history }) {
  return (
    <div style={styles.container}>
      <Typography
        variant="h4"
        gutterBottom
        style={{cursor: 'pointer'}}
        onClick={() => history.push('/')}>
        WFPB Recipes
      </Typography>
      <Divider />
    </div>
  )
}

export const Header = withRouter(HeaderComponent)
