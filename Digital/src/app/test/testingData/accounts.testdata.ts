import { AccountViewModel, ContractViewModel } from '../../myAccount/services/account.service';

export class AccountsTestData {

    public static ClintEastwood: AccountViewModel[] = [
        {
            accountNumber: '90428798',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9101004976'),
                new ContractViewModel('9101163496')
            ],
            firstName: 'Clint',
            lastName: 'Eastwood',
            hasContractInWA: false
        }
    ];

    public static RodBinnington: AccountViewModel[] = [
        {
            accountNumber: '7013149351',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9133061126'),
                new ContractViewModel('9133061138')
            ],
            firstName: 'Rod',
            lastName: 'Binnington',
            hasContractInWA: false
        }
    ];

    public static PeterPeluso: AccountViewModel[] = [
        {
            accountNumber: '7025466058',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9401430437'),
                new ContractViewModel('9401430438'),
                new ContractViewModel('9402638730')
            ],
            firstName: 'PETER',
            lastName: 'PELUSO',
            hasContractInWA: false
        }
    ];

    public static ZoeHannah: AccountViewModel[] = [
        {
            accountNumber: '7042397252',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                Object.assign(new ContractViewModel('9403881265'), {
                    address: '37 Farnley Way, Duncraig Wa 6023',
                    addressFormatted: '',
                    addressRaw: '37 Farnley Way|DUNCRAIG WA 6023',
                    fuelType: 'Gas',
                    regionId: 'WA',
                    isSmartMeter: false
                })
            ],
            firstName: 'Zoe',
            lastName: 'Hannah',
            hasContractInWA: true
        }
    ];

    // TODO: Change this one to use mock customer
    public static clintEastwood4Contracts: AccountViewModel[] = [
        {
            accountNumber: '90428798',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9101004976'),
                new ContractViewModel('9101163496'),
                new ContractViewModel('9101163497'),
                new ContractViewModel('9101163498')
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        }
    ];

    public static freddyNoContracts: AccountViewModel[] = [
        {
            accountNumber: '23423478',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        }
    ];

    public static ReneDescartes: AccountViewModel[] = [
        {
            accountNumber: '20845020',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9002002507'),
                new ContractViewModel('9401786528'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        }
    ];

    public static RichardMunt: AccountViewModel[] = [
        {
            accountNumber: '7016135894',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9139723699'),
                new ContractViewModel('9139723694'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        },
        {
            accountNumber: '7029521254',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9401786227'),
                new ContractViewModel('9401786228'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        },
        {
            accountNumber: '7029521267',
            groupedAddress: '',
            allContractsAreRestricted: true,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9401786237'),
                new ContractViewModel('9401786238'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        }
    ];

    public static IainSanders: AccountViewModel[] = [
        {
            accountNumber: '7018263504',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9400902585'),
                new ContractViewModel('9400921596'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        },
        {
            accountNumber: '7014235472',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9401005102'),
                new ContractViewModel('9401005103'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        },
        {
            accountNumber: '7035252860',
            groupedAddress: '',
            allContractsAreRestricted: false,
            allContractsInflight: () => false,
            allContractsAreNewConnection: false,
            contracts: [
                new ContractViewModel('9402766055'),
                new ContractViewModel('9402766056'),
            ],
            firstName: '',
            lastName: '',
            hasContractInWA: false
        }
    ];
}
