import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockConnection } from '@angular/http/testing';
import { FeatureFlagService, FeatureFlagTypes } from '../myAccount/services/featureFlag.service';

describe(`FEATURE FLAG SERVICE`, () => {

    let featureFlagService: FeatureFlagService;
    let httpService: Http;
    let mockBackend: MockBackend;

    const subscribeToMockBackend = (mockContent) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toBe('./config/featureFlags.json');
            let options = new ResponseOptions({
                body: JSON.stringify(mockContent)
            });
            connection.mockRespond(new Response(options));
        });
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: FeatureFlagService, useClass: FeatureFlagService,
                    deps: [Http]
                }
            ]
        });
    });

    beforeEach(inject([FeatureFlagService, MockBackend],
        (_featureFlagService: FeatureFlagService, _mockBackend: MockBackend) => {
            expect(_featureFlagService).toBeDefined(`The feature flag service was not defined`);
            featureFlagService = _featureFlagService;
            mockBackend = _mockBackend;
        }));

    describe(`manageAccountEnabled`, () => {

        it(`should indicate that the manageAccountEnabled is enabled, when the content indicates it is enabled`, (done) => {
            let mockContent = {
                featureFlags: {
                    manageAccountEnabled: true
                }
            };

            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagged(FeatureFlagTypes.manageAccountEnabled)
                .subscribe(
                    (result) => {
                        expect(result).toBe(true);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

        it(`should indicate that the manageAccountEnabled is disabled, when the content indicates it is disabled`, (done) => {

            let mockContent = {
                featureFlags: {
                    manageAccountEnabled: false
                }
            };
            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagged(FeatureFlagTypes.manageAccountEnabled)
                .subscribe(
                    (result) => {
                        expect(result).toBe(false);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );

        });

        it(`should indicate that the manageAccountEnabled is disabled, when the content does not contain a setting for it`, (done) => {

            let mockContent = {
                featureFlags: {
                }
            };

            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagged(FeatureFlagTypes.manageAccountEnabled)
                .subscribe(
                    (result) => {
                        expect(result).toBe(false);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );

        });

        describe(`Solar Check Enabled`, () => {

            it(`should indicate that the solar check is enabled, when the content indicates it is enabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        solarCheckEnabled: true
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.solarCheckEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(true);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that the solar check is disabled, when the content indicates it is disabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        solarCheckEnabled: false
                    }
                };

                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.solarCheckEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );

                localStorage.removeItem('selfService.featureFlags.solarCheckEnabled');
            });

            it(`should indicate that the solar check is disabled, when the content does not contain a setting for it`, (done) => {

                let mockContent = {
                    featureFlags: {
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.solarCheckEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });
        });

        describe(`Rewards Enabled`, () => {

            it(`should indicate that rewards is enabled, when the content indicates it is enabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        rewardsEnabled: true
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.rewardsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(true);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that rewards is disabled, when the content indicates it is disabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        rewardsEnabled: false
                    }
                };

                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.rewardsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that rewards is disabled, when the content does not contain a setting for it`, (done) => {

                let mockContent = {
                    featureFlags: {
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.rewardsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });
        });

        describe(`Monthly Billing Enabled`, () => {

            it(`should indicate that Monthly Billing is enabled, when the content indicates it is enabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        monthlyBillingEnabled: true
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.monthlyBillingEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(true);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Monthly Billing is disabled, when the content indicates it is disabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        monthlyBillingEnabled: false
                    }
                };

                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.monthlyBillingEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Monthly Billing is disabled, when the content does not contain a setting for it`, (done) => {

                let mockContent = {
                    featureFlags: {
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.monthlyBillingEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });
        });

        describe(`Notifications Enabled`, () => {

            it(`should indicate that Notifications is enabled, when the content indicates it is enabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        manageNotificationsEnabled: true
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.manageNotificationsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(true);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Notifications is disabled, when the content indicates it is disabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        manageNotificationsEnabled: false
                    }
                };

                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.manageNotificationsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Notifications is disabled, when the content does not contain a setting for it`, (done) => {

                let mockContent = {
                    featureFlags: {
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.manageNotificationsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });
        });

        describe(`Energy Insights Enabled`, () => {

            it(`should indicate that Energy Insights is enabled, when the content indicates it is enabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        energyInsightsEnabled: true
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.energyInsightsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(true);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Energy Insights is disabled, when the content indicates it is disabled`, (done) => {

                let mockContent = {
                    featureFlags: {
                        energyInsightsEnabled: false
                    }
                };

                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.energyInsightsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Energy Insights is disabled, when the content does not contain a setting for it`, (done) => {

                let mockContent = {
                    featureFlags: {
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.energyInsightsEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });
        });

        describe(`Energy Insights Disaggregation Enabled`, () => {

            it(`should indicate that Energy Insights Disaggregation is enabled, when the content indicates it is enabled`, (done) => {
                let mockContent = {
                    featureFlags: {
                        energyInsightsDisaggregationEnabled: true
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.energyInsightsDisaggregationEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(true);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Energy Insights Disaggregation is disabled, when the content indicates it is disabled`, (done) => {
                let mockContent = {
                    featureFlags: {
                        energyInsightsDisaggregationEnabled: false
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.energyInsightsDisaggregationEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });

            it(`should indicate that Energy Insights Disaggregation is disabled, when the content does not contain a setting for it`, (done) => {
                let mockContent = {
                    featureFlags: {
                    }
                };
                subscribeToMockBackend(mockContent);
                featureFlagService
                    .featureFlagged(FeatureFlagTypes.energyInsightsDisaggregationEnabled)
                    .subscribe(
                        (result) => {
                            expect(result).toBe(false);
                            done();
                        },
                        (error) => {
                            fail();
                        }
                    );
            });
        });

    });

    describe(`test feature flag values`, () => {

        it(`should return a true filled array when all flags are set to true`, (done) => {
            let mockContent = {
                featureFlags: {
                    manageAccountEnabled: true,
                    solarCheckEnabled: true
                }
            };

            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagValues([FeatureFlagTypes.manageAccountEnabled, FeatureFlagTypes.solarCheckEnabled])
                .subscribe(
                    (result) => {
                        expect(result).toEqual([true, true]);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

        it(`should return [ true, false ] when mixed feature flags are given`, (done) => {
            let mockContent = {
                featureFlags: {
                    manageAccountEnabled: true,
                    solarCheckEnabled: false
                }
            };

            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagValues([FeatureFlagTypes.manageAccountEnabled, FeatureFlagTypes.solarCheckEnabled])
                .subscribe(
                    (result) => {
                        expect(result).toEqual([true, false]);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

        it(`should return false filled array if feature flags are all set to false`, (done) => {
            let mockContent = {
                featureFlags: {
                    manageAccountEnabled: false,
                    solarCheckEnabled: false
                }
            };

            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagValues([FeatureFlagTypes.manageAccountEnabled, FeatureFlagTypes.solarCheckEnabled])
                .subscribe(
                    (result) => {

                        expect(result).toEqual([false, false]);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });

        it(`should return false array if feature flags are not set`, (done) => {
            let mockContent = {
                featureFlags: {}
            };

            subscribeToMockBackend(mockContent);

            featureFlagService
                .featureFlagValues([FeatureFlagTypes.manageAccountEnabled, FeatureFlagTypes.solarCheckEnabled])
                .subscribe(
                    (result) => {
                        expect(result).toEqual([false, false]);
                        done();
                    },
                    (error) => {
                        fail();
                    }
                );
        });
    });
});
