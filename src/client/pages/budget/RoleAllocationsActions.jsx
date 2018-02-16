import React from 'react';
import Button from 'material-ui/Button';
import { TableCell, TableRow } from 'material-ui/Table';
import { ButtonBar } from '../../components';

export default ({ onAddAllocation }) => (
  <TableRow>
    <TableCell colSpan={15}>
      <ButtonBar>
        <Button variant='raised' color={'primary'} onClick={onAddAllocation}>Allocate Resource</Button>
      </ButtonBar>
    </TableCell>
  </TableRow>
);
