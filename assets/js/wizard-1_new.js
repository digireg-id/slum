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

            _wizard.goNext();
            KTUtil.scrollTop();

            // Validate form
            /*var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step
            validator.validate().then(function (status) {
            	if (status == 'Valid') {
            		_wizard.goNext();
            		KTUtil.scrollTop();
            	} else {
            		Swal.fire({
            			text: "Sorry, looks like there are some errors detected, please try again.",
            			icon: "error",
            			buttonsStyling: false,
            			confirmButtonText: "Ok, got it!",
            			customClass: {
            				confirmButton: "btn font-weight-bold btn-light"
            			}
            		}).then(function () {
            			KTUtil.scrollTop();
            		});
            	}
            });*/
        });

        // Change event
        _wizard.on('change', function(wizard) {
            var live = '';
            var live_year = '';
            var peran = '';
            var pengalaman = '';

            if (wizard.currentStep == 2) {
                live_year = getStorage('live_year');
                live = getStorage('live');
                peran = getStorage('peran');
                pengalaman = getStorage('pengalaman');

                $('#live').val(live).change();
                $('#peran').val(peran).change();
                $('#pengalaman').val(pengalaman);

                if (live === null || live === '2') {
                    $('#set_live').hide();
                } else {
                    $('#live_year').val(live_year);
                    $('#set_live').show();
                }

                $('#live').on('change', function() {
                    if (this.value === '1') {
                        $('#live_year').val(live_year);
                        $('#set_live').show();
                    } else {
                        $('#set_live').hide();
                    }
                });
            } else if (wizard.currentStep == 3) {
                live = $('#live').val();
                live_year = $('#live_year').val();
                peran = $('#peran').val();
                pengalaman = $('#pengalaman').val();

                $('#others').hide();
                setStorage('live', live);
                setStorage('live_year', live_year);
                setStorage('peran', peran);
                setStorage('pengalaman', pengalaman);

                if (state == false) {
                    KTLeaflet.init('maps', 'jaksel');
                    timeout();
                    state = true;
                }
            } else if (wizard.currentStep == 4) {
                get_recap();
            }
            KTUtil.scrollTop();
        });
    }

    var initValidation = function() {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        // Step 1
        _validations.push(FormValidation.formValidation(
            _formEl, {
                fields: {
                    package: {
                        validators: {
                            notEmpty: {
                                message: 'Package details is required'
                            }
                        }
                    },
                    weight: {
                        validators: {
                            notEmpty: {
                                message: 'Package weight is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
                            }
                        }
                    },
                    width: {
                        validators: {
                            notEmpty: {
                                message: 'Package width is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
                            }
                        }
                    },
                    height: {
                        validators: {
                            notEmpty: {
                                message: 'Package height is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
                            }
                        }
                    },
                    packagelength: {
                        validators: {
                            notEmpty: {
                                message: 'Package length is required'
                            },
                            digits: {
                                message: 'The value added is not valid'
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

        // Step 3
        /*_validations.push(FormValidation.formValidation(
        	_formEl,
        	{
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
        ));*/

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
        // public functions
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