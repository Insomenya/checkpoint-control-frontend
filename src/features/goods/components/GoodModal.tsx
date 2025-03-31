// shared/common/components/GoodsModal.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Good } from '../../../models/goods';

interface GoodsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (good: Good) => void;
  editingGood?: Good;
}

export const GoodModal: React.FC<GoodsModalProps> = ({ open, onClose, onSubmit, editingGood }) => {
  const { control, handleSubmit, reset } = useForm<GoodFormData>({
    resolver: zodResolver(goodSchema),
    defaultValues: editingGood || goodSchema.parse({}),
  });

  const handleSubmitForm = (data: GoodFormData) => {
    onSubmit({
      ...data,
      id: editingGood ? editingGood.id : Date.now(), // Generate a unique ID for new goods
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingGood ? 'Edit Good' : 'Add Good'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="quantity"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Quantity"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="unit_of_measurement"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Unit of Measurement"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {editingGood ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
