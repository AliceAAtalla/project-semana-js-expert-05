import { describe, test, expect, jest } from '@jest/globals';
import fs from 'fs';
import FileHelper from '../../src/fileHelper.js';

describe('#FileHelper test suite', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 3290319518,
        mode: 33206,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        blksize: 4096,
        ino: 8444249302030273,
        size: 12210,
        blocks: 24,
        atimeMs: 1631019338295.6458,
        mtimeMs: 1629656429539.712,
        ctimeMs: 1629660680784.2517,
        birthtimeMs: 1631019337707.6426,
        atime: '2021-09-07T12:55:38.296Z',
        mtime: '2021-08-22T18:20:29.540Z',
        ctime: '2021-08-22T19:31:20.784Z',
        birthtime: '2021-09-07T12:55:37.708Z'
      };

      const mockUser = 'aliceatalla';
      process.env.USER = mockUser;
      const filename = 'file.png';

      jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename]);
      jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock);
      
      const result = await FileHelper.getFilesStatus("/tmp");

      const expectResult = [
        {
          size: "12.2 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        }
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectResult);
    });
  });
});
