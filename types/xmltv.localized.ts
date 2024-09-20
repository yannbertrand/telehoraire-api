/**
 * A simplified version of XMLTV data in TypeScript, with directly localized strings.
 *
 * It's probably not valid XMLTV per se but it should be easier to use in a localized program.
 */

import type {
  XmltvAudio,
  XmltvEpisodeNumber,
  XmltvIcon,
  XmltvImage,
  XmltvPreviouslyShown,
  XmltvRating,
  XmltvReview,
  XmltvStarRating,
  XmltvStringWithLang,
  XmltvSubtitle,
  XmltvUrl,
  XmltvVideo,
} from './xmltv.i18n.ts';

/**
 * A representation of a person in an XMLTV programme object.
 */
export type XmltvLocalizedPerson = string;

/**
 * A representation of the credits for an XMLTV programme object.
 *
 * People are listed in decreasing order of importance; so for example the starring actors appear
 * first followed by the smaller parts.  As with other parts of this file format, not mentioning
 * a particular actor (for example) does not imply that he _didn't_ star in the film - so normally
 * you'd list only the few most important people.
 *
 * Adapter can be either somebody who adapted a work for television, or somebody who did the translation
 * from another lang. The distinction is not always clear.
 *
 * URL can be, for example, a link to a webpage with more information about the actor, director, etc..
 */
export type XmltvLocalizedCredits = {
  /**
   * The director(s) of the programme.
   */
  director?: XmltvLocalizedPerson[];

  /**
   * The actor(s) in the programme.
   */
  actor?: XmltvLocalizedPerson[];

  /**
   * The writer(s) of the programme.
   */
  writer?: XmltvLocalizedPerson[];

  /**
   * The adapter(s) of the programme.
   */
  adapter?: XmltvLocalizedPerson[];

  /**
   * The producer(s) of the programme.
   */
  producer?: XmltvLocalizedPerson[];

  /**
   * The composer(s) of the programme.
   */
  composer?: XmltvLocalizedPerson[];

  /**
   * The editor(s) of the programme.
   */
  editor?: XmltvLocalizedPerson[];

  /**
   * The presenter(s) of the programme.
   */
  presenter?: XmltvLocalizedPerson[];

  /**
   * The commentator(s) of the programme.
   */
  commentator?: XmltvLocalizedPerson[];

  /**
   * The guest(s) of the programme.
   */
  guest?: XmltvLocalizedPerson[];
};

/**
 * The channel display name.
 */
export type XmltvLocalizedDisplayName = string;

/**
 * The title of a programme.
 */
export type XmltvLocalizedTitle = string;

/**
 * The subtitle of a programme.
 */
export type XmltvLocalizedSubTitle = string;

/**
 * The description of a programme.
 */
export type XmltvLocalizedDesc = string;

/**
 * The category of a programme.
 */
export type XmltvLocalizedCategory = string;

/**
 * The keyword related to a programme.
 */
export type XmltvLocalizedKeyword = string;

/**
 * The language of a programme.
 */
export type XmltvLocalizedLanguage = string;

/**
 * The original language of a programme.
 */
export type XmltvLocalizedOrigLanguage = string;

/**
 * The country where a programme was produced.
 */
export type XmltvLocalizedCountry = string;

/**
 * Object describing a programme
 */
export type XmltvLocalizedProgramme = {
  /**
   * The channel id for the program (see `XmltvLocalizedChannel`)
   * This is a string that uniquely identifies the channel on which the programme is broadcast.
   *
   * @example
   * ```typescript
   * {
   *   channel: 'bbc1.uk'
   * }
   * ```
   */
  channel: string;

  /**
   * Title of the program
   *
   * @example
   * ```typescript
   * {
   *   title: 'The Simpsons'
   * }
   * ```
   */
  title: XmltvLocalizedTitle;

  /**
   * Start time of the program
   *
   * @example
   * ```typescript
   * {
   *   start: new Date('2019-01-01T00:00:00Z');
   * }
   * ```
   */
  start: Date;

  /**
   * Stop time of the program
   *
   * @example
   * ```typescript
   * {
   *   stop: new Date('2019-01-01T00:00:00Z');
   * }
   * ```
   */
  stop?: Date;

  /**
   * The PDC (Program Delivery Control) start time of the programme.
   * This is used to mark the actual start time of a broadcast in a tape-based recording system.
   *
   * PDC stands for Programme Delivery Control. PDC start time is a signal that is transmitted
   * along with the television signal to synchronize the VCR's timer with the beginning of a program.
   * The PDC start time is the precise start time of a television program, accurate to the second,
   * and is useful for programming VCRs to record a particular program.
   *
   * @example
   * ```typescript
   * {
   *   pdcStart: new Date('2019-01-01T00:00:00Z');
   * }
   * ```
   */
  pdcStart?: Date;

  /**
   * VPS start time of the program
   *
   * VPS stands for Video Programming System, a system used in some countries to synchronize the
   * start and end times of television programs. The VPS start time is an optional field in the
   * XMLTV DTD that specifies the start time of the programme according to the VPS system.
   *
   * @example
   * ```typescript
   * {
   *   vpsStart: new Date('2019-01-01T00:00:00Z');
   * }
   * ```
   */
  vpsStart?: Date;

  /**
   * Showview code for the program
   *
   * Showview is a system used in some countries to identify TV programs. It is a six-digit code
   * assigned to each program that provides a unique identifier, which can be used to look up
   * program information in a database. In the XMLTV DTD, the showView attribute is an optional
   * field that specifies the Showview code for the programme.
   *
   * @example
   * ```typescript
   * {
   *   showView: '123456'
   * }
   * ```
   */
  showview?: string;

  /**
   * Video Plus+ code for the program
   *
   * Video Plus+ (VPS+) is a system used in some countries to set the timer of a VCR (Video Cassette Recorder)
   * to record a specific TV program. It works by assigning a code to each program in the TV listings that
   * can be entered into the VCR timer. The VCR then starts recording at the specified time, without the
   * need for the user to set the timer manually. In the XMLTV DTD, the videoplus attribute is an optional
   * field that specifies the Video Plus+ code for the programme.
   *
   * @example
   * ```typescript
   * {
   *   videoPlus: 'V123456'
   * }
   * ```
   */
  videoplus?: string;

  /**
   * Clump index for the program
   *
   * TV listings sometimes have the problem of listing two or more programmes in the same timeslot,
   * such as 'News; Weather'. We call this a 'clump' of programmes, and the `clumpIndex` attribute
   * differentiates between two programmes sharing the same timeslot and channel.
   * In this case News would have clumpIndex="0/2" and Weather would have clumpidx: "1/2".
   *
   * If you don't have this problem, be thankful!
   *
   * @example
   * ```typescript
   * {
   *   clumpidx: '0/2'
   * }
   * ```
   *
   */
  clumpidx?: string;

  /**
   * Subtitle of the program
   *
   * @example
   * ```typescript
   * {
   *   subTitle: 'Treehouse of Horror XXVII'
   * }
   * ```
   */
  subTitle?: XmltvLocalizedSubTitle[];

  /**
   * Description of the program
   *
   * @example
   * ```typescript
   * {
   *   desc: 'The Simpsons go to a haunted house.'
   * }
   * ```
   */
  desc?: XmltvLocalizedDesc;

  /**
   * Credits for the program, including director, actors, writers, etc.
   *
   * @example
   * ```typescript
   * {
   *   credits: {
   *     directors: ['David Silverman'],
   *     actors: [
   *       'Dan Castellaneta',
   *       'Julie Kavner',
   *       'Nancy Cartwright',
   *       'Yeardley Smith',
   *     ],
   *   }
   * }
   */
  credits?: XmltvLocalizedCredits;

  /**
   * Date of the program in YYYYMMDD format
   *
   * The date the programme or film was finished.  This will probably be the same as the copyright date.
   *
   * @example
   * ```typescript
   * {
   *  date: '20190101'
   * }
   * ```
   */
  date?: Date;

  /**
   * Category of the program in different langs
   *
   * @example
   * ```typescript
   * {
   *   categories: ['Comedy']
   * }
   * ```
   */
  category?: XmltvLocalizedCategory[];

  /**
   * Keyword for the program
   *
   * @example
   * ```typescript
   * {
   *   keywords: ['Halloween']
   * }
   * ```
   */
  keyword?: XmltvLocalizedKeyword[];

  /**
   * language used in the program
   *
   * @example
   * ```typescript
   * {
   *  language: 'en'
   * }
   * ```
   */
  language?: XmltvLocalizedLanguage;

  /**
   * Original lang of the program
   *
   * @example
   * ```typescript
   * {
   *   origLanguage: 'en'
   * }
   * ```
   */
  origLanguage?: XmltvLocalizedOrigLanguage;

  /**
   * Length of the program
   *
   * @example
   * ```typescript
   * {
   *   length: {
   *     units: 'minutes',
   *     _value: 30
   *   }
   * }
   * ```
   */
  length?: XmltvLength;

  /**
   * Icon for the program
   *
   * @example
   * ```typescript
   * {
   *   icon: {
   *     src: 'https://example.com/icon.png',
   *     width: 32,
   *     height: 32
   *   }
   * }
   * ```
   */
  icon?: XmltvIcon[];

  /**
   * URL for the program
   *
   * @example
   * ```typescript
   * {
   *   url: {
   *    _value: 'https://example.com/program',
   *    system: 'imdb'
   *   }
   * }
   * ```
   */
  url?: XmltvUrl[];

  /**
   * Country of the program
   *
   * @example
   * ```typescript
   * {
   *   country: 'US'
   * }
   * ```
   */
  country?: XmltvLocalizedCountry;

  /**
   * Episode number for the program in either "onscreen" or "xmltv_ns" format
   *
   * @example
   * ```typescript
   * {
   *   episodeNum: [{
   *     _value: 'S27E07',
   *     type: '27.7'
   *   }]
   * }
   * ```
   */
  episodeNum?: XmltvEpisodeNumber[];

  /**
   * Video details, including aspect ratio, whether it is in colour or black and white, etc.
   *
   * @example
   * ```typescript
   * {
   *   video: {
   *     present: true,
   *     colour: true,
   *     aspect: '16:9',
   *     quality: 'HDTV'
   *   }
   * }
   * ```
   */
  video?: XmltvVideo;

  /**
   * Audio details, similar to video details.
   *
   * @example
   * ```typescript
   * {
   *   audio: {
   *     present: true,
   *     stereo: 'stereo'
   *   }
   * }
   * ```
   */
  audio?: XmltvAudio;

  /**
   * When and where the programme was last shown, if known.  Normally in TV listings 'repeat'
   * means 'previously shown on this channel', but if you don't know what channel the old
   * screening was on (but do know that it happened) then you can omit the 'channel' attribute.
   *
   * Similarly you can omit the 'start' attribute if you don't know when the previous transmission
   * was (though you can of course give just the year, etc.).
   *
   * The absence of this element does not say for certain that the programme is brand new and
   * has never been screened anywhere before.
   *
   * @example
   * ```typescript
   * {
   *   previouslyShown: {
   *     start: '2019-01-01T00:00:00Z',
   *     channel: 'example.com'
   *   }
   * }
   * ```
   *
   */
  previouslyShown?: XmltvPreviouslyShown;

  /**
   * Premiere details for the program in different langs
   *
   * Different channels have different meanings for this word - sometimes it means a film
   * has never before been seen on TV in that country, but other channels use it to mean
   * 'the first showing of this film on our channel in the current run'.  It might have been
   * shown before, but now they have paid for another set of showings, which makes the first
   * in that set count as a premiere!
   *
   * So this element doesn't have a clear meaning, just use it to represent where 'premiere'
   * would appear in a printed TV listing. You can use the content of the element to explain
   * exactly what is meant.
   *
   * @example
   * ```typescript
   * {
   *   premiere:'First showing on this channel'
   * }
   * ```
   *
   * If you don't want to give an explanation, just set it to true:
   *
   * @example
   * ```typescript
   * {
   *   premiere: true
   * }
   * ```
   */
  premiere?: XmltvStringWithLang | boolean;

  /**
   * Last chance details for the program in different langs
   *
   * In a way this is the opposite of premiere.  Some channels buy the rights to show a
   * movie a certain number of times, and the first may be flagged 'premiere',
   * the last as 'last showing'.
   *
   * For symmetry with premiere, you may use the element content to give a 'paragraph'
   * describing exactly what is meant - it's unlikely to be the last showing ever!
   * Otherwise, explicitly put empty content.
   *
   * @example
   * ```typescript
   * {
   *   lastChance: 'Last showing on this channel'
   * }
   * ```
   */
  lastChance?: XmltvStringWithLang | boolean;

  /**
   * This is the first screened programme from a new show that has never been shown on television
   * before (if not worldwide then at least never before in this country).
   *
   * After the first episode or programme has been shown, subsequent ones are no longer 'new'.
   * Similarly the second series of an established programme is not 'new'.
   *
   * Note that this does not mean 'new season' or 'new episode' of an existing show.
   * You can express part of that using the episode-num stuff.
   *
   * @example
   * ```typescript
   * {
   *   new: true
   * }
   * ```
   */
  new?: boolean;

  /**
   * Subtitles details for the program
   *
   * @example
   * ```typescript
   * {
   *   subtitles: [
   *     { type: 'teletext', language: {_value: 'English'} },
   *     { type: 'onscreen', language: {_value: 'French', lang: 'fr'} }
   *   ]
   * }
   * ```
   */
  subtitles?: XmltvSubtitle[];

  /**
   * Various bodies decide on classifications for films - usually a minimum age you must be to see it.
   * In principle the same could be done for ordinary TV programmes. Because there are many systems for
   * doing this, you can also specify the rating system used eg MPAA, VCHIP, etc.
   *
   * @example
   * ```typescript
   * {
   *   system: 'MPAA',
   *   _value: 'PG',
   *   icon: [{
   *     src: 'https://www.themoviedb.org/assets/1/v4/logos/32x32-blue-1f8b5c2fda197d0ee7d4f5b9fdca72a67ac3c9f7f8f8f8f8f8f8f8f8f8f8f8f8f.png',
   *     width: 32,
   *     height: 32
   *   }]
   * }
   * ```
   *
   */
  rating?: XmltvRating[];

  /**
   * Star rating for the program, including value and system
   *
   * Star rating' - many listings guides award a programme a score as a quick guide to how good it is.
   * The value of this element should be 'N / M', for example one star out of a possible five stars would be '1 / 5'.
   *
   * Zero stars is also a possible score (and not the same as 'unrated').  You should try to map whatever wacky system
   * your listings source uses to a number of stars: so for example if they have thumbs up, thumbs sideways and thumbs down,
   * you could map that to two, one or zero stars out of two.
   *
   * If a programme is marked as recommended in a listings guide you could map this to '1 / 1'.
   *
   * Because there could be many ways to provide star-ratings or recommendations for a programme, you can specify
   * multiple star-ratings. You can specify the star-rating system used, or the provider of the recommendation,
   * with the system attribute. Whitespace between the numbers and slash is ignored.
   *
   * @example
   * ```typescript
   * {
   *   starRating: [{
   *     value: '1 / 5',
   *     system: 'IMDB',
   *     icon: {
   *       src: 'https://www.themoviedb.org/assets/1/v4/logos/32x32-blue-1f8b5c2fda197d0ee7d4f5b9fdca72a67ac3c9f7f8f8f8f8f8f8f8f8f8f8f8f8f.png',
   *       width: 32,
   *       height: 32
   *     }
   *   }]
   * }
   * ```
   */
  starRating?: XmltvStarRating[];

  /**
   * Review details for the program
   *
   * Listings guides may provide reviews of programmes in addition to, or in place of, standard
   * programme descriptions. They are usually written by in-house reviewers, but reviews can also
   * be made available by third-party organisations/individuals. The value of this element must
   * be either the text of the review, or a URL that links to it. Optional attributes giving the
   * review source and the individual reviewer can also be specified.
   *
   * @example
   * ```typescript
   * {
   *  review: {
   *   _value: 'https://www.imdb.com/title/tt0111161/reviews',
   *  type: 'url',
   * source: 'IMDB',
   * reviewer: 'John Doe',
   * lang: 'en'
   * }
   * ```
   *
   * @example
   * ```typescript
   * {
   *   review: [{
   *     _value: 'A great movie',
   *     type: 'text',
   *     source: 'IMDB',
   *     reviewer: 'John Doe',
   *     lang: 'en'
   *   }]
   * }
   * ```
   */
  review?: XmltvReview[];

  /**
   * Images associated with the program
   *
   * @example
   * ```typescript
   * {
   *   images: [{
   *     src: 'https://www.themoviedb.org/assets/1/v4/logos/32x32-blue-1f8b5c2fda197d0ee7d4f5b9fdca72a67ac3c9f7f8f8f8f8f8f8f8f8f8f8f8f8f.png',
   *     type: 'poster
   *     orient: 'L',
   *     size: 3
   *   }]
   * }
   * ```
   */
  image?: XmltvImage[];
};

/**
 * The channel details
 */
export type XmltvLocalizedChannel = {
  /**
   * The channel id
   *
   * @example
   * ```typescript
   * {
   *   id: 'channel-1'
   * }
   * ```
   */
  id: string;

  /**
   * The channel display name
   *
   * @example
   * ```typescript
   * {
   *   displayName: 'Channel 1'
   * }
   * ```
   */
  displayName: XmltvLocalizedDisplayName;

  /**
   * The channel icon
   *
   * @example
   * ```typescript
   * {
   *   icon: [{
   *     src: 'https://www.themoviedb.org/assets/1/v4/logos/32x32-blue-1f8b5c2fda197d0ee7d4f5b9fdca72a67ac3c9f7f8f8f8f8f8f8f8f8f8f8f8f8f.png',
   *     width: 32,
   *     height: 32
   *   }]
   * }
   * ```
   */
  icon?: XmltvIcon[];

  /**
   * The channel url
   *
   * @example
   * ```typescript
   * {
   *   url: [{_value: 'https://www.channel1.com'}]
   * ]
   * ```
   */
  url?: XmltvUrl[];
};

export type XmltvLocalized = {
  channels: XmltvLocalizedChannel[];
  programmes: XmltvLocalizedProgramme[];
  date?: Date;
  sourceInfoName?: string;
  generatorInfoName?: string;
  sourceInfoUrl?: string;
  sourceDataUrl?: string;
  generatorInfoUrl?: string;
};
