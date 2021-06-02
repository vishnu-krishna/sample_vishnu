import { TestBed } from '@angular/core/testing';
import { ApiService } from './../../shared/service/api.service';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { TrackerMode } from '../../shared/globals/ommTrackerConstants';
import { HeaderViewModel } from '../../shared/model/ommTracker/trackStatusHeader.model';
import { ContentService } from '../../shared/service/content.service';
import { IMoveJoinApiService } from '../../shared/service/contract/imoveJoinApi.service';
import { TrackerService } from './tracker.service';

describe('Tracker service', () => {
    let service: TrackerService;

    let sitecoreTestData;
    let accountTestData;

    let apiTestData;
    let moveAndJoinService;
    let contentService;
    let apiService;

    beforeEach(() => {
        let contentServiceStub = {
            load: () => {
                throw new Error('contentServiceStub.load has not been mocked properly.');
            },
            getContent: () => {
                throw new Error('contentServiceStub.getContent has not been mocked properly.');
            }
        };

        let apiServiceStub = {
            getAccounts(): Observable<any> {
                return Observable.from(
                    []
                );
            },
            startSync() {
                let startSync = '';
            }
        };

        let moveJoinServiceStub: IMoveJoinApiService = {
            GetOMMTracker(): Observable<any> {
                return Observable.from(
                    []
                );
            },
            get errors(): Subject<any> {
                return new Subject<any>();
            },
            get checkAuthorization(): Subject<any> {
                return new Subject<any>();
            },
            get checkExpiredOMM(): Subject<any> {
                return new Subject<any>();
            }
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: IMoveJoinApiService, useValue: moveJoinServiceStub },
                { provide: ContentService, useValue: contentServiceStub },
                { provide: ApiService, useValue: apiServiceStub }
            ]
        });

        moveAndJoinService = TestBed.get(IMoveJoinApiService);
        contentService = TestBed.get(ContentService);
        apiService = TestBed.get(ApiService);

        service = new TrackerService(moveAndJoinService, contentService, apiService);

        sitecoreTestData = {
            connectionStatuses: {
                Requested: 'Requested',
                Confirmed: 'Confirmed',
                Checking: 'Checking'
            },
            connectionTitle: 'Connection dates',
            singleFuelConnectionTitle: 'Connection date',
            didYouKnowTitle: 'Did you know?',
            disconnectionTitle: 'Disconnection dates',
            singleFuelDisconnectionTitle: 'Disconnection date',
            headerStatuses: {
                RequestReceived: "We're underway",
                ProcessingTenPercent: "We're underway",
                ProcessingNinetyPercent: "We're almost done",
                ReadyToConnect: 'Ready to connect',
                WelcomeHome: 'Welcome home page',
                Checking: 'An expert is looking into your connection'
            },
            needToMakeAChangeTitle: 'Need to make a change?',
            progressBar: {
                0: 'Request received',
                1: 'Processing',
                2: 'Ready to connect'
            },
            whatHappensNextItems: [],
            whatHappensNextTitle: 'What happens next?',
            didYouKnow: {
                dualFuel: {
                    nSW: {
                        list: ['poweroff', 'accessgaselectricity', 'specialassistance']
                    },
                    qLD: {
                        list: ['poweroff', 'specialassistance']
                    },
                    LDVI: {
                        list: ['visualinspection', 'mainswitch', 'specialassistance']
                    },
                    sA: {
                        list: ['poweroff', 'accessgaselectricity', 'specialassistance']
                    },
                    vIC: {
                        list: ['poweroff', 'notifyus', 'accessgaselectricity', 'specialassistance']
                    }
                },
                electricity: {
                    nSW: {
                        list: ['poweroff', 'accesselectricity', 'specialassistance']
                    },
                    qLD: {
                        list: ['accesselectricity', 'specialassistance']
                    },
                    qLDVI: {
                        list: ['visualinspection', 'mainswitch', 'specialassistance']
                    },
                    sA: {
                        list: ['poweroff', 'accesselectricity', 'specialassistance']
                    },
                    vIC: {
                        list: ['poweroff', 'notifyus', 'accesselectricity', 'specialassistance']
                    }
                },
                gas: {
                    aLL: {
                        list: ['accessgas', 'specialassistance']
                    }
                }
            },
            didYouKnowReference: {
                accesselectricity: {
                    description: 'Please provide clear access to your electricity meter.',
                    heading: 'Please provide clear access',
                    icon: 'svg/main_switch_icon.svg'
                },
                accessgas: {
                    description: 'Please provide access to your gas meter.',
                    heading: 'Please provide access to your gas meter',
                    icon: 'svg/main_switch_icon.svg'
                },
                accessgaselectricity: {
                    description: 'Please provide clear access to your electricity and gas meters. ',
                    heading: 'Access to your electricity and gas meters. ',
                    icon: 'svg/main_switch_icon.svg'
                },
                mainswitch: {
                    description: 'Please ensure your main switch is in the off position and there is clear access to your electricity meter. ',
                    heading: 'Please ensure your main switch is in the off position',
                    icon: 'svg/main_switch_icon.svg'
                },
                notifyus: {
                    description: 'Please notify us prior to your connection date if there has been or will be any work completed at the property that may lead to contact with the wires since the property was last disconnected” ',
                    heading: 'Please notify us',
                    icon: 'svg/main_switch_icon.svg'
                },
                poweroff: {
                    description: 'If your power is off, please ensure your main switch is in the off position. This is so your energy can be connected safely. ',
                    heading: 'If your power is off',
                    icon: 'svg/main_switch_icon.svg'
                },
                specialassistance: {
                    description: 'If you have a known access issue which could impact your move, chat to us now so we can make the necessary arrangements on your behalf.',
                    heading: 'Need special access assistance?',
                    icon: 'svg/main_switch_icon.svg'
                },
                visualinspection: {
                    description: '• If personal items are at the premise an adult over 18 years of age must be in attendance.\r\n• If the premise is completely empty, no furniture or items of any kind (excluding fixtures and fittings), a key can be left to access the property.  If this is you, chat to us now so we can make the necessary arrangements.',
                    heading: 'About your visual safety inspection',
                    icon: 'svg/main_switch_icon.svg'
                }
            },
            disconnectionSubtext: {
                dualFuel: {
                    NSW: 'dualfuel2',
                    VIC: 'dualfuel2',
                    SA: 'dualfuel2',
                    QLDVI: 'dualfuel2',
                    QLD: 'dualfuel2'
                },
                electricity: {
                    VIC: 'electricity2',
                    NSW: 'electricity2',
                    SA: 'electricity2',
                    QLDVI: 'electricity2',
                    QLD: 'electricity2'
                },
                gas: {
                    ALL: 'gas'
                }
            },
            connectionSubtext: {
                dualFuel: {
                    VIC: 'dualfuel1',
                    NSW: 'dualfuel1',
                    SA: 'dualfuel1',
                    QLDVI: 'visualinsp',
                    QLD: 'dualfuel2'
                },
                electricity: {
                    VIC: 'electricity1',
                    NSW: 'electricity1',
                    SA: 'electricity1',
                    QLDVI: 'visualinsp',
                    QLD: 'electricity2'
                },
                gas: {
                    ALL: 'gas'
                }
            },
            connectionSubtextReference: {
                gas: 'Please ensure there is clear access to your gas meter.',
                electricity1: 'Please ensure there is clear access to your electricity meter. If your power is off, please ensure that your main switch is in the off position.',
                electricity2: 'Please ensure there is clear access to your electricity meter.',
                visualinsp: 'Your visual safety inspection is scheduled for [date] date, between [from]am and [to]pm.',
                dualfuel1: 'Please ensure there is clear access to your electricity and gas meters. If your power is off, please ensure that your main switch is in the off position.',
                duelfuel2: 'Please ensure there is clear access to your electricity and gas meters.'
            },
            whatHappensNextReference: {
                next: {
                    description: 'Michael Fassbender (born 2 April 1977) is a German-born Irish actor. His feature film debut was in the fantasy war epic 300 (2007) as a Spartan warrior; his earlier roles included various stage productions, as well as starring roles on television such as in the HBO miniseries Band of Brothers (2001) and the Sky One fantasy drama Hex (2004–05). He first came to prominence for his role as IRA activist Bobby Sands in Hunger (2008), for which he won a British Independent Film Award. Subsequent roles include in the independent film Fish Tank (2009), as a Royal Marines lieutenant in Inglourious Basterds (2009), as Edward Rochester in the 2011 film adaptation of Jane Eyre, as Carl Jung in A Dangerous Method (2011), as a sentient android in Prometheus (2012), and in the musical comedy-drama Frank (2014) as an eccentric musician loosely inspired by Frank Sidebottom.',
                    heading: "What we'll do next"
                },
                welcome: {
                    description: 'Star Wars is an American epic space opera franchise, centered on a film series created by George Lucas. It depicts the adventures of various characters \"a long time ago in a galaxy far, far away\". The franchise began in 1977 with the release of the film Star Wars (later subtitled Episode IV: A New Hope in 1981[2][3]), which became a worldwide pop culture phenomenon. It was followed by the successful sequels The Empire Strikes Back (1980) and Return of the Jedi (1983); these three films constitute the original Star Wars trilogy. A prequel trilogy was released between 1999 and 2005, which received mixed reactions from both critics and fans. A sequel trilogy began in 2015 with the release of Star Wars: The Force Awakens. All seven films were nominated for Academy Awards (with wins going to the first two films) and have been commercial successes, with a combined box office revenue of over $7.5 billion,[4] making Star Wars the third highest-grossing film series.[5] Spin-off films include the animated Star Wars: The Clone Wars (2008) and Rogue One (2016), the latter of which is the first in an upcoming series of anthology films.',
                    heading: 'Welcome to your tracker'
                }
            }
        };

        accountTestData = [
            {
                number: '7019079511',
                firstName: 'Lauren',
                lastName: 'Ferguson',
                contracts: [
                    {
                        address: 'U C105/460 Victoria Street|BRUNSWICK VIC 3056',
                        accountNumber: '7019079511',
                        fuelType: 'Electricity',
                        nameId: 'AGL_0000C99DF8261ED582B680F41CDC4EDF',
                        number: '9400307029',
                        planName: 'Set and Forget',
                        inFlight: false,
                        contractStatus: '',
                        isRestricted: false,
                        hasElectricVehicle: false
                    }
                ]
            }
        ];

        apiTestData = {
            oneMinuteMove: {
                referenceCode: 'AZ878WEX',
                requestType: 'MoveInAndOut',
                status: 'ProcessingTenPercent',
                expiryDate: '2017-06-10',
                lastUpdated: '2017-06-01T04:23:44',
                moveOut: {
                    requestedDate: '2017-05-26',
                    contracts: [{
                        contractNumber: 9400575245,
                        isCancelled: false,
                        actualDate: '2017-05-27'
                    }, {
                        contractNumber: 9400575246,
                        isCancelled: false,
                        actualDate: '2017-05-28'
                    }]
                },
                moveIn: {
                    requestedDate: '2017-05-30',
                    requestedAddress: {
                        floorNumber: '9',
                        unitNumber: '1',
                        streetNumber: '378',
                        streetName: 'High Street',
                        suburb: 'Templestowe Lower',
                        postcode: '3107',
                        state: 'VIC'
                    },
                    contracts: [{
                        fuelType: 'Gas',
                        status: 'Confirmed',
                        expiryDate: '2017-06-10',
                        contractNumber: 1200575245,
                        actualDate: '2017-06-01',
                        actualAddress: {
                            floorNumber: '9',
                            unitNumber: '1',
                            streetNumber: '378',
                            streetName: 'High Street',
                            suburb: 'Templestowe Lower',
                            postcode: '3107',
                            state: 'VIC'
                        }
                    }, {
                        fuelType: 'Electricity',
                        status: 'Confirmed',
                        expiryDate: '2017-06-10',
                        contractNumber: 1200575246,
                        actualDate: '2017-06-01',
                        actualAddress: {
                            floorNumber: '9',
                            unitNumber: '1',
                            streetNumber: '378',
                            streetName: 'High Street',
                            suburb: 'Templestowe Lower',
                            postcode: '3107',
                            state: 'VIC'
                        },
                        requestedAppointmentSlot: '08:00',
                        actualAppointmentSlot: '13:00'
                    }]
                }
            }
        };
    });

    it('should be instantiated by test bed', () => {
        expect(service).toBeDefined();
    });

    it('should get did you know messages correctly', () => {
        let didYouKnowMsgList = service.getDidYouKnowMsgList(sitecoreTestData, 'electricity', 'vIC');
        expect(didYouKnowMsgList.length).toBe(4);
    });

    it('should get trackerMode WelcomeHome when request status is welcome home', () => {
        apiTestData.oneMinuteMove.status = 'WelcomeHome';
        const trackerMode = service.getTrackerStatus(apiTestData);
        expect(trackerMode).toBe(TrackerMode.WelcomeHome);
    });

    it('should get trackerMode Tracking request status is not welcome home', () => {
        const trackerMode = service.getTrackerStatus(apiTestData);
        expect(trackerMode).toBe(TrackerMode.Track);
    });

    it('should retrieve reference number from api', ((done) => {
        spyOn(moveAndJoinService, 'GetOMMTracker').and.returnValue(Observable.of(apiTestData));
        spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accountTestData));
        spyOn(contentService, 'load');
        spyOn(contentService, 'getContent').and.returnValue(Observable.of({ selfService: { oMMTracker: sitecoreTestData } }));
        service.loadContent().subscribe();
        service.load().subscribe((data) => {
            expect(data.referenceNumber).toBe('AZ878WEX');
            done();
        });
    }));

    it('should get  the corrrect Header status text and status icon if status of both the fules are not checking for dual fuel fuel ', () => {
        let headerStatus: HeaderViewModel;
        let expectedHeaderStatus: HeaderViewModel = {
            statusText: "We're underway",
            statusIcon: 'icon-status-in-process',
            subText: '',
            welcomeText: ''
        };
        // ARRANGE
        apiTestData.oneMinuteMove.moveIn.contracts[0].status = 'Confirmed';
        apiTestData.oneMinuteMove.moveIn.contracts[0].fuelType = 'Electricity';
        apiTestData.oneMinuteMove.moveIn.contracts[1].fuelType = 'Gas';
        apiTestData.oneMinuteMove.moveIn.contracts[1].status = 'Confirmed';
        apiTestData.oneMinuteMove.status = 'ProcessingTenPercent';

        // ACT
        headerStatus = service.getHeaderStatus(apiTestData, sitecoreTestData);

        // ASSERT
        expect(headerStatus.statusText).toBe(expectedHeaderStatus.statusText);
        expect(headerStatus.statusIcon).toBe(expectedHeaderStatus.statusIcon);
    });

    it('should get  the corrrect Header status text and status icon  if status of both the fules are checking for dual fuel  ', () => {
        let headerStatus: HeaderViewModel;
        let expectedHeaderStatus: HeaderViewModel = {
            statusText: 'An expert is looking into your connection',
            statusIcon: 'icon-status-looking',
            subText: '',
            welcomeText: ''
        };
        // ARRANGE
        apiTestData.oneMinuteMove.moveIn.contracts[0].status = 'Checking';
        apiTestData.oneMinuteMove.moveIn.contracts[0].fuelType = 'Electricity';
        apiTestData.oneMinuteMove.moveIn.contracts[1].status = 'Checking';
        apiTestData.oneMinuteMove.moveIn.contracts[1].fuelType = 'Gas';
        apiTestData.oneMinuteMove.status = 'ProcessingTenPercent';

        // ACT
        headerStatus = service.getHeaderStatus(apiTestData, sitecoreTestData);

        // ASSERT
        expect(headerStatus.statusText).toBe(expectedHeaderStatus.statusText);
        expect(headerStatus.statusIcon).toBe(expectedHeaderStatus.statusIcon);
    });

    it('should get  the corrrect Header status text and status icon  if it is single fuel and status is  checking  ', () => {
        let headerStatus: HeaderViewModel;
        let expectedHeaderStatus: HeaderViewModel = {
            statusText: 'An expert is looking into your connection',
            statusIcon: 'icon-status-looking',
            subText: '',
            welcomeText: ''
        };
        // ARRANGE
        apiTestData.oneMinuteMove.moveIn.contracts = apiTestData.oneMinuteMove.moveIn.contracts.slice(1);
        apiTestData.oneMinuteMove.moveIn.contracts[0].status = 'Checking';
        apiTestData.oneMinuteMove.moveIn.contracts[0].fuelType = 'Electricity';
        apiTestData.oneMinuteMove.status = 'ProcessingTenPercent';

        // ACT
        headerStatus = service.getHeaderStatus(apiTestData, sitecoreTestData);

        // ASSERT
        expect(headerStatus.statusText).toBe(expectedHeaderStatus.statusText);
        expect(headerStatus.statusIcon).toBe(expectedHeaderStatus.statusIcon);
    });

    it('should get  the corrrect  Header status text and status icon if it is single fuel and status is not checking  ', () => {
        let headerStatus: HeaderViewModel;
        let expectedHeaderStatus: HeaderViewModel = {
            statusText: "We're underway",
            statusIcon: 'icon-status-in-process',
            subText: '',
            welcomeText: ''
        };
        // ARRANGE
        apiTestData.oneMinuteMove.moveIn.contracts = apiTestData.oneMinuteMove.moveIn.contracts.slice(1);
        apiTestData.oneMinuteMove.moveIn.contracts[0].status = 'Confirmed';
        apiTestData.oneMinuteMove.moveIn.contracts[0].fuelType = 'Electricity';
        apiTestData.oneMinuteMove.status = 'ProcessingTenPercent';

        // ACT
        headerStatus = service.getHeaderStatus(apiTestData, sitecoreTestData);

        // ASSERT
        expect(headerStatus.statusText).toBe(expectedHeaderStatus.statusText);
        expect(headerStatus.statusIcon).toBe(expectedHeaderStatus.statusIcon);
    });

    it('should get the corrrect did you know view model', () => {
     // ACT
     let didYouKnowViewModel = service.getDidYouKnowViewModel(apiTestData, sitecoreTestData, 'dualFuel', 'vic');

        // ASSERT
     expect(didYouKnowViewModel.didYouKnowMsgList.length).toBe(4);
     expect(didYouKnowViewModel.didYouKnowMsgList.find((msg) => msg.heading === sitecoreTestData.didYouKnowReference.poweroff.heading).heading).toBe(sitecoreTestData.didYouKnowReference.poweroff.heading);
     expect(didYouKnowViewModel.didYouKnowMsgList.find((msg) => msg.heading === sitecoreTestData.didYouKnowReference.notifyus.heading).heading).toBe(sitecoreTestData.didYouKnowReference.notifyus.heading);
     expect(didYouKnowViewModel.didYouKnowMsgList.find((msg) => msg.heading === sitecoreTestData.didYouKnowReference.accessgaselectricity.heading).heading).toBe(sitecoreTestData.didYouKnowReference.accessgaselectricity.heading);
     expect(didYouKnowViewModel.didYouKnowMsgList.find((msg) => msg.heading === sitecoreTestData.didYouKnowReference.specialassistance.heading).heading).toBe(sitecoreTestData.didYouKnowReference.specialassistance.heading);
    });

});
