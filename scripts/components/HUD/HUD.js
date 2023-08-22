import React from 'react';
import './HUD.scss';

import { H5PContext } from '../../context/H5PContext';
import AudioButton from './Buttons/AudioButton';
import Button from './Buttons/Button/Button';
import { SceneTypes } from '../Scene/Scene';

export default class HUD extends React.Component {
  /**
   * @class
   * @param {object} props React props.
   */
  constructor(props) {
    super(props);
    this.buttons = {};
  }

  /**
   * Get scene audio track.
   * @param {object} scene Scene to get track for.
   * @returns {object} Audio track props.
   */
  getSceneAudioTrack(scene) {
    const props = {
      isPlaying: this.props.audioIsPlaying,
      onIsPlaying: this.props.onAudioIsPlaying,
      sceneWasPlaying: this.props.sceneAudioWasPlaying,
      onSceneWasPlaying: this.props.onSceneAudioWasPlaying,
      isHiddenBehindOverlay: this.props.isHiddenBehindOverlay,
      nextFocus: this.props.nextFocus,
      restartAudioOnSceneStart: scene.restartAudioOnSceneStart,
      updateSceneAudioPlayers: this.props.updateSceneAudioPlayers,
      interactionAudioPlayers: this.props.interactionAudioPlayers,
    };

    if (
      scene?.audio?.length > 0 &&
      (!scene.audioType || scene.audioType === 'audio')
    ) {
      props.sceneAudioTrack = scene.audio;
      props.sceneId = scene.sceneId;
    }

    if (scene?.audioType === 'playlist' && scene?.playlist) {
      const playlist = this.checkIfPlaylist(
        scene, this.context.params.playlists
      );
      if (playlist != null) {
        props.sceneAudioTrack = playlist.audioTracks;
        props.playlistId = playlist.playlistId;
        props.sceneId = scene.sceneId;
      }
    }

    const noSceneAudio = (scene?.audioType === 'audio') && !scene?.audio;
    const noScenePlaylist = (scene?.audioType === 'playlist') && !scene?.playlist;

    if (
      scene && (noSceneAudio || noScenePlaylist) &&
      this.context.behavior?.playlist
    ) {
      const playlist = this.checkIfPlaylist(
        this.context.behavior, this.context.params.playlists
      );
      if (playlist != null) {
        props.sceneAudioTrack = playlist.audioTracks;
        props.playlistId = playlist.playlistId;
        props.sceneId = scene.sceneId;
      }
    }

    return props;
  }

  /**
   * Determine whether parent contains playlist. // TODO: Rename function to recflect purpose
   * @param {object} parent Parent.
   * @param {object} playlists Playlists.
   * @returns {object|null} Playlist.
   */
  checkIfPlaylist(parent, playlists) {
    const parentHasPlaylist = (parent !== null) &&
      (parent.playlist !== null) && (parent.audioType === 'playlist');

    if (parentHasPlaylist && (playlists != null)) {
      return playlists.find((playlist) => {
        return playlist.playlistId === parent.playlist;
      });
    }

    return null;
  }

  /**
   * Show scene description.
   */
  showSceneDescription() {
    this.props.onSceneDescription(this.props.scene.scenedescription);
  }

  /**
   * React render function.
   * @returns {object} JSX element.
   */
  render() {
    const showScoresButton = this.props.showScoresButton;
    const showHomeButton = this.props.showHomeButton;
    const isThreeSixty =
      this.props.scene.sceneType === SceneTypes.THREE_SIXTY_SCENE;

    return (
      <div className="hud" aria-hidden={ this.props.isHiddenBehindOverlay ?
        true :
        undefined
      }>
        <div className="hud-top-right">
        </div>
        <div className="hud-bottom-left">
          <AudioButton { ...this.getSceneAudioTrack(this.props.scene) }/>
          { this.props.scene.scenedescription &&
            <Button
              type={ 'scene-description' }
              label={ this.context.l10n.sceneDescription }
              isHiddenBehindOverlay={ this.props.isHiddenBehindOverlay }
              nextFocus={ this.props.nextFocus }
              onClick={ this.showSceneDescription.bind(this) }
            />
          }
          {
            isThreeSixty &&
            <Button
              type={ 'reset' }
              label={ this.context.l10n.resetCamera }
              isHiddenBehindOverlay={ this.props.isHiddenBehindOverlay }
              nextFocus={ this.props.nextFocus }
              onClick={ this.props.onCenterScene }
            />
          }{
            showHomeButton &&
            <Button
              type={ 'go-to-start' }
              label={this.props.isStartScene ?
                this.context.l10n.userIsAtStartScene :
                this.context.l10n.goToStartScene
              }
              isHiddenBehindOverlay={ this.props.isHiddenBehindOverlay }
              nextFocus={ this.props.nextFocus }
              onClick={ this.props.onGoToStartScene }
              disabled = {this.props.isStartScene}
            />
          }{
            showScoresButton &&
            <Button
              type={ 'score-summary' }
              label={ this.context.l10n.scoreSummary }
              isHiddenBehindOverlay={ this.props.isHiddenBehindOverlay }
              nextFocus={ this.props.nextFocus }
              onClick={ this.props.onShowingScoreSummary }
            />
          }
          { false &&
            <Button
              type={ 'submit-dialog' }
              label={ this.context.l10n.submitDialog }
              isHiddenBehindOverlay={ this.props.isHiddenBehindOverlay }
              nextFocus={ this.props.nextFocus }
              onClick={ this.props.onSubmitDialog}
            />
          }
        </div>
      </div>
    );
  }
}

HUD.contextType = H5PContext;
