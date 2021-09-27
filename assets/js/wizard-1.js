"use strict";

// Class definition
var KTWizard1 = function() {
    // Base elements
    var _wizardEl;
    var _formEl;
    var _wizard;
    var _validations = [];

    // Private functions
    var initWizard = function() {
        // Initialize form wizard
        _wizard = new KTWizard(_wizardEl, {
            startStep: 1, // initial active step number
            clickableSteps: true // allow step clicking
        });

        // Validation before going to next page
        _wizard.on('beforeNext', function(wizard) {
            // Don't go to the next step yet
            _wizard.stop();

            // _wizard.goNext();
            // KTUtil.scrollTop();

            // Validate form
            var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step
            validator.validate().then(function(status) {
                if (status == 'Valid') {
                    _wizard.goNext();
                    KTUtil.scrollTop();
                    var live = '';
                    var live_year = '';
                    var peran = '';
                    var pengalaman = '';

		    if (wizard.getStep() == 2) {
                        $('#set_live').hide();
			$('#btn_next').removeAttr('disabled');

                        live = getCookie('live');
                        live_year = getCookie('live_year');
                        peran = getCookie('peran');
                        pengalaman = getCookie('pengalaman');

                        $('#live').val(live).change();
                        $('#peran').val(peran).change();
                        $('#pengalaman').val(pengalaman);
                        $('#live_year').val(live_year);

                        if (live) {
                            $('#live_year').val(live_year);
			    if(live === '1') {
                            	$('#set_live').show();
			    } else {
				$('#set_live').hide();
			    }
                        }

                        $('#live').on('change', function() {
                            if (this.value === '1') {
                                $('#live_year').val(live_year);
                                $('#set_live').show();
                            } else {
                                $('#set_live').hide();
                            }
                        });
                    } else if (wizard.getStep() == 3) {
			$('#set_others').hide();
                        live = $('#live').val();
                        peran = $('#peran').val();
                        pengalaman = $('#pengalaman').val();
                        live_year = $('#live_year').val();

                        setCookie('peran', peran);
                        setCookie('live', live);
                        setCookie('live_year', live_year);
                        setCookie('pengalaman', pengalaman);

                        if (state == false) {
                            KTLeaflet.init('maps', 'jaksel');
                            timeout();
                            state = true;
                        }

			get_checking_question();
                    } else if (wizard.getStep() == 4) {
			if(get_checking_question() == false) {
			    wizard.goTo(3);
			}
                        reset();
                        get_recap();
                        get_list_recap();
                    }
                } else {
                    Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn font-weight-bold btn-light"
                        }
                    }).then(function() {
                        KTUtil.scrollTop();
                    });
                }
            });
        });

        // Change event
        _wizard.on('change', function(wizard) {
	    if(wizard.getStep() == 1) {
		$('#btn_next').removeAttr('disabled');
	    }

	    if(wizard.getStep() == 2) {
		$('#btn_next').removeAttr('disabled');
	    }

            KTUtil.scrollTop();
        });

        _wizard.on('change', function(wizard) {
            KTUtil.scrollTop();
        });
    }

    var initValidation = function() {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    str_step: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        ));

        // Step 2
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    peran: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required'
                            }
                        }
                    },
                    pengalaman: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required'
                            },
                            digits: {
                                message: 'The value is not valid'
                            }
                        }
                    },
                    live: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required'
                            }
                        }
                    },
                    live_year: {
                        validators: {
                            callback: {
                                message: 'This field is required',
                                callback: function(value) {
                                    var ret = '';
                                    var value = $('#live').val();
                                    var value_year = $('#live_year').val();

                                    if (value === '1') {
                                        if (value_year === '') {
                                            ret = false;
                                        } else {
                                            ret = true;
                                        }
                                    } else {
                                        ret = true;
                                    }

                                    return ret;
                                }
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }));

        // Step 3
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    delivery: {
                        validators: {
                            notEmpty: {
                                message: 'Delivery type is required'
                            }
                        }
                    },
                    packaging: {
                        validators: {
                            notEmpty: {
                                message: 'Packaging type is required'
                            }
                        }
                    },
                    preferreddelivery: {
                        validators: {
                            notEmpty: {
                                message: 'Preferred delivery window is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        ));

        // Step 4
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    locaddress1: {
                        validators: {
                            notEmpty: {
                                message: 'Address is required'
                            }
                        }
                    },
                    locpostcode: {
                        validators: {
                            notEmpty: {
                                message: 'Postcode is required'
                            }
                        }
                    },
                    loccity: {
                        validators: {
                            notEmpty: {
                                message: 'City is required'
                            }
                        }
                    },
                    locstate: {
                        validators: {
                            notEmpty: {
                                message: 'State is required'
                            }
                        }
                    },
                    loccountry: {
                        validators: {
                            notEmpty: {
                                message: 'Country is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap()
                }
            }
        ));
    }

    return {
        init: function() {
            _wizardEl = KTUtil.getById('kt_wizard');
            _formEl = KTUtil.getById('kt_form');

            initWizard();
            initValidation();
        }
    };
}();

jQuery(document).ready(function() {
    KTWizard1.init();
});