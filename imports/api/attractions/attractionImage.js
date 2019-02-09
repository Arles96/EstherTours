import { FilesCollection } from 'meteor/ostrio:files';
import { MongoInternals } from 'meteor/mongo';
import fs from 'fs';
import Grid from 'gridfs-stream';

let gfs;
if (Meteor.isServer) {
  gfs = Grid(
    MongoInternals.defaultRemoteCollectionDriver().mongo.db,
    MongoInternals.NpmModule
  );
}

const AttractionImages = new FilesCollection({
  collectionName: 'AttractionImages',
  onBeforeUpload: function (file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return () => 'Error la imagen debe ser menor o igual a 10MB';
    }
  },
  onAfterUpload: function (image) {
    // Move file to GridFS
    Object.keys(image.versions).forEach(versionName => {
      const metadata = {
        versionName: versionName,
        imageId: image._id,
        storedAt: new Date()
      };
      const writeStream = gfs.createWriteStream({
        filename: image.name,
        metadata: metadata
      });

      fs.createReadStream(image.versions[versionName].path).pipe(writeStream);

      writeStream.on('close', Meteor.bindEnvironment(file => {
        const property = `versions.${versionName}.meta.gridFsFileId`;

        // If we store the ObjectID itself, Meteor (EJSON?) seems to convert it to a
        // LocalCollection.ObjectID, which GFS doesn't understand.
        this.collection.update(image._id, { $set: { [property]: file._id.toString() } });
        this.unlink(this.collection.findOne(image._id), versionName); // Unlink files from FS
      }));
    });
  },
  interceptDownload: function (http, image, versionName) {
    // Serve file from GridFS
    const _id = (image.versions[versionName].meta || {}).gridFsFileId;
    if (_id) {
      const readStream = gfs.createReadStream({ _id });
      readStream.on('error', err => { throw err; });
      readStream.pipe(http.response);
    }
    return Boolean(_id); // Serve file from either GridFS or FS if it wasn't uploaded yet
  },
  onAfterRemove: function (images) {
    // Remove corresponding file from GridFS
    images.forEach(image => {
      Object.keys(image.versions).forEach(versionName => {
        const _id = (image.versions[versionName].meta || {}).gridFsFileId;
        if (_id) gfs.remove({ _id }, err => { if (err) throw err; });
      });
    });
  }
});

export default AttractionImages;