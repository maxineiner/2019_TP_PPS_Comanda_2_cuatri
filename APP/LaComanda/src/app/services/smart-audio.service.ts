import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class SmartAudioService {

    audioType = 'html5';
    sounds: any = [];

    constructor(public nativeAudio: NativeAudio, platform: Platform) {
        if (platform.is('cordova')) {
            this.audioType = 'native';
        }
    }

    preload(key, asset) {

        if (true) {

            const audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };

            this.sounds.push(audio);

        } else {
            this.nativeAudio.preloadComplex(key, asset, 100, 1, 0)
            .catch(error => {
                alert('Error in preload:' + error + ' ' + key + ' ' + asset);
            });

            const audio = {
                key: key,
                asset: asset,
                type: 'native'
            };

            this.sounds.push(audio);
        }

    }

    play(key) {

        const audio = this.sounds.find((sound) => {
            return sound.key === key;
        });

        if (true) {

            const audioAsset = new Audio(audio.asset);
            audioAsset.play();

        } else {

            this.nativeAudio.play(audio.key).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });

        }

    }

}