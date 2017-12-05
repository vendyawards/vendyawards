import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      first: { type: String, optional: true },
      second: { type: String, optional: true },
      third: { type: String, optional: true },
      fourth: { type: String, optional: true },
      fifth: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ first = '', second = '', third = '', fourth = '', fifth = '', username }) {
    // make sure required fields are OK.
    const checkPattern = { first: String, second: String, third: String, fourth: String, fifth: String,
      username: String };
    check({ first, second, username, third, fourth, fifth }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    return this._collection.insert({ first, second, username, third, fourth, fifth });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const first = doc.first;
    const second = doc.second;
    const username = doc.username;
    const third = doc.third;
    const fourth = doc.fourth;
    const fifth = doc.fifth;
    return { first, second, username, third, fourth, fifth };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
