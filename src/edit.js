import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { Flex, FlexItem, PanelBody, PanelRow, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  console.log('attributes: ', attributes);

  const { numOfColumns, borderRadius } = attributes;
  console.log('numOfColumns: ', numOfColumns);

  const flexItems = Array.from({ length: numOfColumns }, (_, index) => (
    <FlexItem className='flex-item'>
      Card { index + 1}
    </FlexItem>
  ));

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <TextControl
              label='Number of items'
              value={numOfColumns}
              onChange={(value) => setAttributes({ numOfColumns: value})}
              />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <TextControl
              label='Border Radius'
              value={borderRadius} 
              onChange={(value) => setAttributes({ borderRadius: value})}
              />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <Flex {...useBlockProps({ attributes })}
        align='center'
        justify='space-around'
      >
        { flexItems }
      </Flex>
    </>
  );
}
