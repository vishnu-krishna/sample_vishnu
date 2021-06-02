export enum TrackerMode {
  Building,
  Track,
  WelcomeHome
}

export enum ConnectionType {
  MoveIn = 1,
  MoveOut = 0
}

export const FuelTypeMap = {
  Electricity: 'electricity',
  Gas: 'gas',
  Dual: 'dualFuel'
};

export const StateMap = {
  All: 'all',
  VisualInspection: 'vi'
};

// sitecore placeholder
export const SCPlaceHolder = {
  connectionSubtext: {
    from: '[from]',
    to: '[to]',
    date: '[date]'
  }
};
