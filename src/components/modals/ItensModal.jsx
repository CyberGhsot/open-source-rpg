import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, Grid,
    DialogTitle, Button
} from '@mui/material'

import { api } from '../../utils';

const styles = theme => ({

})

function ItensModal({
    classes,
    handleClose,

    onSubmit,
    data,
    operation
}) {
    const [itens, setItem] = useState({
        name: '',
    });

    useEffect(() => {
        if(!data) {
            return;
        }

        setItem({
            name: data.name,
        });
    }, [data]);
    
    const resetState = () => {
        return setItem({
            name: '',
        });
    }

    const submit = () => {
        if(!item.name) {
            return;
        }

        if(operation === 'create') {
            api.post('/item', item)
                .then(() => {
                    // Callback
                    onSubmit();

                    // Close modal
                    handleClose();

                    resetState();
                })
                .catch(() => {
                    alert('Erro ao criar o item!');
                });
        }
        else if (operation === 'edit') {
            api.put(`/item/${data.id}`, item)
                .then(() => {
                    // Callback
                    onSubmit();

                    // Close modal
                    handleClose();

                    resetState();
                })
                .catch(() => {
                    alert('Erro ao editar item!');
                });
        }
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>
                {
                    operation === 'create' ? 'Criar novo item' : 'Editar o item'
                }
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                marginTop: '15px'
                            }}
                            autoFocus
                            label="Nome"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={item.name}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setItem(prevState => ({
                                        ...prevState,
                                        name: value
                                    }));
                                }
                            }
                            spellCheck={false}
                        />
                    </Grid>                   
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={submit}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(ItensModal);