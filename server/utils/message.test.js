var expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const messageFrom  = 'akatigaku@gmail.com';
    const text = 'Yo! what is up';
    const message = generateMessage(messageFrom, text);

    expect(message)
      .toMatch({
        from: messageFrom,
        text
      });
    expect(message.createAt).toBeA('number');
  });
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const messageFrom = 'Admin';
    const latitude = '35.5767922,139';
    const longitude = '139.6893658';
    const staticUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(messageFrom, latitude, longitude);

    expect(message)
      .toMatch({
        from: messageFrom,
        url: staticUrl
      })
    expect(message.createAt).toBeA('number');
  });
})