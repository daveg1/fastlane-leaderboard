interface Config {
  hasConfetti: boolean;
  siteBanner?: string;
  userIds: string[];
  defaultAvatarUrl: string;
}

const config: Config = {
  defaultAvatarUrl:
    "https://www.racefacer.com/assets/frontend/img/avatars/27.png",
  hasConfetti: false,
  siteBanner: "VLAD OWES HUNTER ONE APPLE FRITTER",
  userIds: [
    "16448048",
    "16448049",
    "16763556",
    "16103571",
    "12403272",
    "16819852",
    "16819746",
  ],
};

export default config;
