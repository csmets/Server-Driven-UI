import * as React from 'react';
import { Button as ButtonComponent } from "@mui/material";
import { SignalContext } from '../provider/signal';
import { signalPairKeyValue } from '../helper/signal-pair-key-value';
import { SignalStringValueVM, SignalValuePairKey } from '../models/signal-vm';
import { adaptButtonSize } from './button';
import { gql, useMutation } from '@apollo/client';
import { FavouriteActionVM } from '../models/actions/favourite-action';
import { FavouriteButtonData } from '../models/buttons/favourite-button-vm';

const saveItemMutationQuery = gql`
  mutation saveItem($feedId: String!) {
      save(feedId: $feedId) {
        success
        error {
          message
        }
      }
  }
`;

const FavouriteButton = (props: { data: FavouriteButtonData }) => {
  const { data } = props;
  const { icon, signal, action } = data;

   /*
    Mutations here are to save or unsave a feed item. These mutations will always
    only return a list of signals to emit. These mutations will only return a key
    and will contain no values. All values are given up-front from the server
    initially.
  */
  const [saveItemMutation, saveResponse] = useMutation(saveItemMutationQuery);

  const signalContext = React.useContext(SignalContext);
  const { useSignalEvent, emitSignals } = signalContext;

  // This is to set the feed favourite icon.
  const [svg, setSvg] = React.useState(icon);

  const [isFav, setIsFav] = React.useState(false);

  /*
    To be able to use values that get emitted, a signal must be registered. When
    registering a signal, a subscriber is returned. The subscribe is a listener
    that will return values that get emitted.
  */
  const signalCallback = ({ result, cache }: any): void => {
    const value = signalPairKeyValue(SignalValuePairKey.Icon, result.values)
    if (value instanceof SignalStringValueVM) {
      if (cache) {
        cache?.modify({
          id: cache.identify(props.data),
          fields: {
            icon() {
              return value;
            }
          },
        })
      } else {
        setSvg(value.text);
      }
    }
  };
  useSignalEvent(signal, signalCallback);

  const onClick = () => {
    if (action instanceof FavouriteActionVM) {
      const feedId = action?.feedId || "";
      saveItemMutation({
        variables: { feedId },
        update(cache, _) {
          if (isFav) {
            action?.unsave && emitSignals(action.unsave, cache)
          } else {
            action?.save && emitSignals(action?.save, cache)
          }
        }
      });

      if (isFav) {
        action?.unsave && emitSignals(action.unsave)
      } else {
        action?.save && emitSignals(action?.save)
      }

      setIsFav(!isFav);
    }
  }

  React.useEffect(() => {
    // Fallback to original value when error has occurred
    if (saveResponse.error) {
      console.error(saveResponse.error);
      if (data?.signal) {
        emitSignals([{
          signal: data?.signal,
          values: [{
            key: SignalValuePairKey.Icon,
            value: new SignalStringValueVM(icon)
          }]
        }])
      }
    }
  }, [saveResponse])


  if (saveResponse.loading) {
    console.log('waiting on mutation response');
  }


  if (!data) {
    return <></>
  }

  return (
    <ButtonComponent
      onClick={onClick}
      variant={'text'}
      disabled={data.disabled}
      disableElevation={true}
      color={'primary'}
      size={adaptButtonSize(data.size)}
    >
      {svg && <img src={svg} alt="" width="20px" height="20px" />}
    </ButtonComponent>
  )
}

export { FavouriteButton };