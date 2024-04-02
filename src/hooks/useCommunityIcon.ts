import {useCallback, useMemo} from 'react'
// import github from 'src/assets/img/community/github.png'
// import github_active from 'src/assets/img/community/github_active.png'
// import github_light from 'src/assets/img/community/github_light.png'
//
// import telegram from 'src/assets/img/community/telegram.png'
// import telegram_active from 'src/assets/img/community/telegram_active.png'
// import telegram_light from 'src/assets/img/community/telegram_light.png'

// import twitter from 'src/assets/img/community/twitter.png'
// import twitter_active from 'src/assets/img/community/twitter_active.png'
// import twitter_light from 'src/assets/img/community/twitter_light.png'

import other from 'src/assets/img/community/other.png'
import other_active from 'src/assets/img/community/other_active.png'
import other_light from 'src/assets/img/community/other_light.png'

// import linkedin from 'src/assets/img/community/linkedin.png'
// import linkedin_active from 'src/assets/img/community/linkedin_active.png'
// import linkedin_light from 'src/assets/img/community/linkedin_light.png'

import whitebook from 'src/assets/img/community/whitebook.png'
import whitebook_active from 'src/assets/img/community/whitebook_active.png'
import whitebook_light from 'src/assets/img/community/whitebook_light.png'

import discord from 'src/assets/img/community/discord.png'
import discord_active from 'src/assets/img/community/discord_active.png'
import discord_light from 'src/assets/img/community/discord_light.png'

import gitbook from 'src/assets/img/community/gitbook.png'
import gitbook_active from 'src/assets/img/community/gitbook_active.png'
import gitbook_light from 'src/assets/img/community/gitbook_light.png'

import medium from 'src/assets/img/community/medium.png'
import medium_active from 'src/assets/img/community/medium_active.png'
import medium_light from 'src/assets/img/community/medium_light.png'

import youtube from 'src/assets/img/community/youtube.png'
import youtube_active from 'src/assets/img/community/youtube_active.png'
import youtube_light from 'src/assets/img/community/youtube_light.png'

import github_3 from 'src/assets/img/community/github_3.png';
import github_4 from 'src/assets/img/community/github_4.png';
import telegram_3 from 'src/assets/img/community/telegram_3.png';
import telegram_4 from 'src/assets/img/community/telegram_4.png';
import twitter_3 from 'src/assets/img/community/twitter_3.png';
import twitter_4 from 'src/assets/img/community/twitter_4.png';
import linkedin_3 from 'src/assets/img/community/linkedin_3.png';
import linkedin_4 from 'src/assets/img/community/linkedin_4.png';

const defaultIcons = {
  name: 'other',
  icons: {
    dark: other,
    light: other_light,
    active: other_active,
  },
}
export function useCommunityIcon() {
  const communityIcons = useMemo(() => {
    return [
      {
        name: 'github',
        icons: {
          dark: github_3,
          light: github_4,
          active: github_3,
        },
      },
      {
        name: 'telegram',
        icons: {
          dark: telegram_3,
          light: telegram_4,
          active: telegram_3,
        },
      },
      {
        name: 'twitter',
        icons: {
          dark: twitter_3,
          light: twitter_4,
          active: twitter_3,
        },
      },
      {
        name: 'linkedin',
        icons: {
          dark: linkedin_3,
          light: linkedin_4,
          active: linkedin_3,
        },
      },
      {
        name: 'whitebook',
        icons: {
          dark: whitebook,
          light: whitebook_light,
          active: whitebook_active,
        },
      },
      {
        name: 'discord',
        icons: {
          dark: discord,
          light: discord_light,
          active: discord_active,
        },
      },
      {
        name: 'gitbook',
        icons: {
          dark: gitbook,
          light: gitbook_light,
          active: gitbook_active,
        },
      },
      {
        name: 'medium',
        icons: {
          dark: medium,
          light: medium_light,
          active: medium_active,
        },
      },
      {
        name: 'youtube',
        icons: {
          dark: youtube,
          light: youtube_light,
          active: youtube_active,
        },
      },
    ]
  }, [])

  const getCommunityIconByName = useCallback(
    (name: string) => {
      const iconInfo = communityIcons.find((item) => {
        return name.toLowerCase().includes(item.name)
      })
      return iconInfo || defaultIcons
    },
    [communityIcons]
  )

  return {communityIcons, getCommunityIconByName}
}
