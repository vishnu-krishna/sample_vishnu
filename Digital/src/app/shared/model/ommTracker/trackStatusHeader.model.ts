export class HeaderViewModel {
  public statusText: string;
  public statusIcon: string;
  public subText: string;
  public welcomeText: string;
}

export const HeaderStatusIcon = {
    RequestReceived: 'icon-status-tick',
    ProcessingTenPercent: 'icon-status-in-process',
    ProcessingNinetyPercent: 'icon-status-clock',
    ReadyToConnect: 'icon-status-power-plug',
    WelcomeHome: 'icon-status-home',
    Checking: 'icon-status-looking'
};
