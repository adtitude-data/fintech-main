import React, { Component } from "react";
import Swal from "sweetalert2";

export default class DeleteAccountAlertWarning extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick() {
        Swal.fire({
            ...this.props,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            onOpen: () => {
                // code
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your account has been deleted.',
                    'success'
                )
            }
        });
    }

    render() {
        return (
            <div>
                <button class="btn btn-warning" onClick={this.HandleClick}>
                </button>
            </div>
        );
    }
}
