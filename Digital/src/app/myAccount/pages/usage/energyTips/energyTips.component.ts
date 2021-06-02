import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'agl-energy-tips',
    templateUrl: './energyTips.component.html',
    styleUrls: ['./energyTips.component.scss']
})

export class EnergyTipsComponent implements OnInit {

    public readMore: string = 'lessInfo';
    public readMore2: string = 'lessInfo';
    public currentTipIndex: number = 0;
    public currentTipIndex2: number = 1;
    public tips: Tips[] = [
        {
            icon: 'img/icon_dish_washer.png',
            title: 'Dishwasher',
            summary: `Only use the dishwasher when you have a full load.`,
            info: `Many dishwashers use the same amount of water and energy regardless`,
            infoExtended: `of the number of dishes loaded. So waiting until the dishwasher is full before starting a wash, rather than just running it with half loads, should mean using it less and reducing energy and water consumption.`
        },
        {
            icon: 'svg/icon_exhaust_fan.svg',
            title: 'Exhaust Fan',
            summary: `Don't let warm air escape, draught seal exhaust fans.`,
            info: `Don't let warm air escape your home. Up to 25% of household heat loss is`,
            infoExtended: `caused by air draughts from improper seals, and old exhaust fans in the kitchen. Also, the bathroom and laundry may be letting warm air escape your home and cold air blow in. Cover up your existing fan to maintain a comfortable temperature without spending a fortune on heating and cooling.`,
        },
        {
            icon: 'svg/icon_heater.svg',
            title: 'Heater',
            summary: `Replace an electric heater with a natural gas heater.`,
            info: `Heating can be one of the biggest contributors to your energy bill.`,
            infoExtended: `If you're thinking of buying a new heater, choose an efficient system that's suited to your needs. Gas heaters are cheaper to run than standard electric heaters and produce around a third of the amount of greenhouse gas emissions.`,
        },
        {
            icon: 'svg/icon_dryer.svg',
            title: 'Clothes dryer',
            summary: `Aim for the stars when purchasing a clothes dryer.`,
            info: `A higher star rated clothes dryer uses less energy and reduces its running`,
            infoExtended: `costs, so keep this in mind when buying a new item. You can also use the EnergyRating website to compare different clothes dryers or see if you can get a gas-fired or heat pump model. They are more expensive to buy and install, but cheaper to run`,
        },
        {
            icon: 'svg/icon_insulators.svg',
            title: 'Insulators',
            summary: `Dress up your windows for natural insulation.`,
            info: `Use curtains, awnings, shutters, blinds and plants to shade sunlight coming in`,
            infoExtended: `through your windows. Shading windows in summer can reduce the amount of heat entering your home, helping to reduce cooling costs. With the right type of shading, sunlight can still enter the room in winter to help warm your home.`
        },
        {
            icon: 'svg/icon_lighting.svg',
            title: 'Lighting',
            summary: `Have a “light bulb” moment and upgrade your globes.`,
            info: `Upgrading to energy efficient lighting is an easy way to reduce the amount of`,
            infoExtended: `energy that you use on lighting. Replace the light globes in your house with energy efficient bulbs to help reduce the amount of energy it takes to light your home. Using lamps is also a great way to use less power, by lighting only the spaces that you are using. It's also a good idea to make the most of any natural light in your home where possible.`,
        },
        {
            icon: 'svg/icon_fan.svg',
            title: 'Fan',
            summary: `Get friendly with your fan to stay cool.`,
            info: `They can't reduce temperature the way air conditioners do, but fans are still`,
            infoExtended: `pretty clever. Using a lot less energy to circulate the air and keep the room temperature consistent and comfortable. So whenever the mercurys on the rise, throw your support behind ceiling and pedestal fans.`,
        },
        {
            icon: 'svg/icon_shower.svg',
            title: 'Shower',
            summary: `Suss out the right shower head for savings.`,
            info: `Lurking behind your showers steaming hot water is a system that can be a`,
            infoExtended: `big burden on your gas and electricity bills. But install a water-efficient shower head and you could slash the amount of water it uses, saving on both your water and water heating bills.`,
        },
        {
            icon: 'svg/icon_draft_sealers.svg',
            title: 'Draft Sealers',
            summary: `Don't let a draft have the last laugh.`,
            info: `Close doors, seal cracks around windowsills and skirting boards and`,
            infoExtended: `rest draft blockers along the bottom of your doorframes and you're bound to help your air conditioner and heater hit that right temperature sooner – not to mention, gobble less energy getting there.`,
        },
        {
            icon: 'svg/icon_washing_machine.svg',
            title: 'Washing Machine',
            summary: `Give your washing the cold shoulder.`,
            info: `Hot water can put the heat on your laundry's energy costs – even when`,
            infoExtended: `most clothes are cool with cold water wash. Not only can washing cold cycle extend the life of some fabrics, it reduces your energy use, saving you for your next shopping spree.`,
        },
        {
            icon: 'svg/icon_dryer.svg',
            title: 'Clothes Dryer',
            summary: `Give your dryer a little extra space.`,
            info: `Leave about a quarter of your dryer's barrel empty and you should find`,
            infoExtended: `your clothes can dry faster, fresher and by using less energy. Or for an even more energy efficient laundry, pop your linens on the line in the backyard and see how the sun and wind can do your dryer's dirty work for donuts.`,
        },
        {
            icon: 'svg/icon_tv.svg',
            title: 'TV',
            summary: 'Pull the plug on appliances.',
            info: `Did you know that many appliances use electricity even when they're switched`,
            infoExtended: `“off”? Plasma TVs, set top boxes and computers are just some of the power-hungry appliances that happily sit in “stand by” and burn through electricity just because they're plugged in. Unplugging these cunning, costly gadgets before going to bed and leaving for work can save you significantly on your energy use.`,
        },
        {
            icon: 'svg/icon_old_appliance.svg',
            title: 'Old Appliance',
            summary: `Out with the old, in with the new.`,
            info: `A professional service can give your old fridge or air conditioner a new lease`,
            infoExtended: `on life, but if it lives longer than 10 or 15 years it may be more cost effective to swap the appliance for a younger model. And when you're out shopping, watch for the Energy Rating stars: the more stars, the less energy the appliance uses.`,
        },
        {
            icon: 'svg/icon_fridge.svg',
            title: 'Fridge',
            summary: `Give your hungry fridge a health check.`,
            info: `Your fridge is hungry for power which can account for up to 7% of your`,
            infoExtended: `household's annual energy usage. To run your fridge efficiently, make sure the door seal is tight and free from gaps so cold air can't escape. If you have a second fridge or freezer, only turn it on when you need it.`,
        },
    ];

    private screenWidth: number;
    private deviceType: number;

    public ngOnInit() {
        this.screenWidth = screen.width;
        this.setWidth(this.screenWidth);
    }

    public swipeLeft() {
        this.onClickNextTip();
    }

    public swipeRight() {
        this.onClickPreviousTip();
    }

    // Used to expand and contract the energy saving tips div when the 'read more' or 'read less' buttons are pressed
    public onClickInfoChange(infoChange) {
        this.readMore = infoChange;
    }

    public onClickInfoChange2(infoChange2) {
        if (this.deviceType === 2) {
            this.readMore2 = infoChange2;
        }
    }

    public onClickPreviousTip() {
        if (this.currentTipIndex > 1) {
            this.currentTipIndex = this.currentTipIndex - this.deviceType;
            this.currentTipIndex2 = this.currentTipIndex + 1;
        } else {
            this.currentTipIndex = this.tips.length - this.deviceType;
            if (this.deviceType === 1 && (this.currentTipIndex === (this.tips.length - 1))) {
                this.currentTipIndex2 = 0;
            } else {
                this.currentTipIndex2 = this.currentTipIndex + 1;
            }
        }
        this.readMore = 'lessInfo';
        this.readMore2 = 'lessInfo';
    }

    public onClickNextTip() {
        let length = this.tips.length;
        if (this.currentTipIndex < (length - this.deviceType)) {
            this.currentTipIndex = this.currentTipIndex + this.deviceType;
            if (this.deviceType === 1 && (this.currentTipIndex === (this.tips.length - 1))) {
                this.currentTipIndex2 = 0;
            } else {
                this.currentTipIndex2 = this.currentTipIndex + 1;
            }
        } else {
            this.currentTipIndex = 0;
            this.currentTipIndex2 = this.currentTipIndex + 1;
        }
        this.readMore = 'lessInfo';
        this.readMore2 = 'lessInfo';
    }

    private setWidth(width: number) {
        if (width >= 992) {
            this.deviceType = 2;
        } else if (width >= 768) {
            this.deviceType = 2;
        } else {
            this.deviceType = 1;
        }
    }
}

interface Tips {
    icon: string;
    title: string;
    summary: string;
    info: string;
    infoExtended: string;
}
